"use client";

import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export function Toolbar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-5 py-[14px] px-[26px] border-b border-admin-border">
      <button className="flex items-center gap-[7px] text-[14.5px] text-admin-nav-text cursor-pointer bg-none border-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
      </button>
      <div className="flex items-center gap-[7px] text-[14.5px] text-admin-nav-text">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search"
          className="border-none outline-none text-[14.5px] bg-none w-[200px] text-admin-text placeholder:text-admin-muted"
        />
      </div>
      <button className="flex items-center gap-[7px] text-[14.5px] text-admin-nav-text cursor-pointer bg-none border-none ml-auto">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M3 17l6-6 4 4 8-8" />
        </svg>
        Customize
      </button>
    </div>
  );
}
