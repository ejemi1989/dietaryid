#!/usr/bin/env python3
"""Bulk UK restaurant collector via BrowserAct Google Maps API.

Runs a matrix of UK city x cuisine queries in parallel, dedupes by
(name, address), saves incrementally, and stops at TARGET unique records.
"""
import os, sys, time, json, datetime, threading
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

TEMPLATE_ID = "77577579210625331"
API_BASE_URL = "https://api.browseract.com/v2/workflow"
TARGET = 1000
MAX_CALLS = 200          # hard cap on billed calls
MAX_WORKERS = 8          # parallel in-flight tasks
TASK_TIMEOUT = 900       # seconds per task before giving up
OUT_JSON = "/Users/oladimeji/dietary/uk_restaurants_1000.json"
PROGRESS = "/tmp/bulk_progress.txt"

API_KEY = os.getenv("BROWSERACT_API_KEY")
if not API_KEY:
    print("ERROR: BROWSERACT_API_KEY not set", flush=True); sys.exit(1)
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

CITIES = [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield",
    "Bristol", "Glasgow", "Edinburgh", "Cardiff", "Newcastle upon Tyne",
    "Nottingham", "Leicester", "Coventry", "Bradford", "Belfast", "Brighton",
    "Kingston upon Hull", "Plymouth", "Stoke-on-Trent", "Wolverhampton",
    "Derby", "Southampton", "Portsmouth", "Reading", "Aberdeen", "Dundee",
    "Swansea", "Oxford", "Cambridge", "York", "Norwich", "Exeter", "Bath",
    "Bournemouth", "Middlesbrough", "Sunderland", "Luton", "Milton Keynes",
    "Northampton", "Preston", "Blackpool", "Ipswich", "Peterborough",
    "Gloucester", "Chester", "Inverness", "Wrexham", "Bangor", "Lincoln",
]
TERMS = [
    "restaurants", "Indian restaurant", "Italian restaurant",
    "Chinese restaurant", "Turkish restaurant",
]

# Build query matrix, city-major so cuisines spread within each city.
QUERIES = [f"{term} in {city}" for city in CITIES for term in TERMS]

lock = threading.Lock()
records = []                 # accumulated unique dicts
seen = set()                 # dedup keys
calls_made = 0
stop_flag = threading.Event()

def log(msg):
    ts = datetime.datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(PROGRESS, "a", encoding="utf-8") as f:
        f.write(line + "\n")

def dkey(r):
    return (str(r.get("Tittle Name", "")).strip().lower(),
            str(r.get("Address", "")).strip().lower())

def save():
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)

def run_query(q):
    """Submit one task, poll to completion, return list of dicts (or [])."""
    if stop_flag.is_set():
        return q, []
    payload = {"workflow_template_id": TEMPLATE_ID,
               "input_parameters": [
                   {"name": "keywords", "value": q},
                   {"name": "language", "value": "en"},
                   {"name": "country", "value": "gb"}]}
    try:
        res = requests.post(f"{API_BASE_URL}/run-task-by-template",
                            json=payload, headers=HEADERS, timeout=60).json()
    except Exception as e:
        log(f"FAIL submit '{q}': {e}"); return q, []
    if "id" not in res:
        if "Invalid authorization" in str(res):
            log("FATAL: Invalid authorization — stopping."); stop_flag.set()
        else:
            log(f"FAIL start '{q}': {res}")
        return q, []
    tid = res["id"]
    deadline = time.time() + TASK_TIMEOUT
    while time.time() < deadline:
        if stop_flag.is_set():
            return q, []
        time.sleep(10)
        try:
            st = requests.get(f"{API_BASE_URL}/get-task-status?task_id={tid}",
                              headers=HEADERS, timeout=60).json().get("status")
        except Exception:
            continue
        if st == "finished":
            break
        if st in ("failed", "canceled"):
            log(f"task {st}: '{q}'"); return q, []
    else:
        log(f"timeout: '{q}'"); return q, []
    try:
        info = requests.get(f"{API_BASE_URL}/get-task?task_id={tid}",
                            headers=HEADERS, timeout=60).json()
        s = info.get("output", {}).get("string")
        data = json.loads(s) if s else []
        if isinstance(data, dict):
            data = [data]
        return q, data
    except Exception as e:
        log(f"parse fail '{q}': {e}"); return q, []

def main():
    global calls_made
    open(PROGRESS, "w").close()
    log(f"Starting bulk collection. target={TARGET} max_calls={MAX_CALLS} "
        f"workers={MAX_WORKERS} queries_available={len(QUERIES)}")
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futures = {}
        qi = 0
        # prime the pool
        while qi < len(QUERIES) and len(futures) < MAX_WORKERS and calls_made < MAX_CALLS:
            futures[ex.submit(run_query, QUERIES[qi])] = QUERIES[qi]
            calls_made += 1; qi += 1
        while futures:
            for fut in as_completed(list(futures)):
                futures.pop(fut, None)
                q, data = fut.result()
                added = 0
                with lock:
                    for r in data:
                        k = dkey(r)
                        if k != ("", "") and k not in seen:
                            seen.add(k); records.append(r); added += 1
                    save()
                    total = len(records)
                log(f"done '{q}': +{added} new (total={total}, calls={calls_made})")
                if total >= TARGET:
                    stop_flag.set()
                # refill
                if (not stop_flag.is_set() and qi < len(QUERIES)
                        and calls_made < MAX_CALLS):
                    nq = QUERIES[qi]
                    futures[ex.submit(run_query, nq)] = nq
                    calls_made += 1; qi += 1
                break  # re-enter as_completed with updated set
            if stop_flag.is_set():
                # let in-flight finish naturally via remaining as_completed loop
                if not futures:
                    break
    save()
    log(f"FINISHED. unique={len(records)} calls={calls_made} -> {OUT_JSON}")

if __name__ == "__main__":
    main()
