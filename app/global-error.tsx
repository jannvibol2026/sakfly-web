"use client";

/**
 * GlobalCrashFallback — 03-pages-and-layouts.md §13.3, 04-component-library.md §15.3.
 * Minimal, chrome-free fallback with no dependency on the provider tree
 * (which may itself be implicated in the crash). Deliberately plain HTML
 * only — no Tailwind class dependency that could itself fail to load.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <p style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.5rem" }}>SAKFLY</p>
          <p style={{ marginBottom: "1.5rem", color: "#6B7280" }}>
            Something went wrong on our end.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "6px",
              background: "#6D28D9",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
