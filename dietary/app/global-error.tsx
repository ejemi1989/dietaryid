"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "24px", fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 8px" }}>Something went wrong!</h2>
          <p style={{ fontSize: "14px", color: "#666", margin: "0 0 24px" }}>An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "14px" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
