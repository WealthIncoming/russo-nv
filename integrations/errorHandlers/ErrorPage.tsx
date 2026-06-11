import { useRouteError } from "react-router-dom";

// Minimal error boundary UI for the self-hosted build. Replaces the former
// Wix/Vite dev error-overlay element, which doesn't exist outside dev.
export default function ErrorPage() {
  const error = useRouteError() as Error | undefined;

  return (
    <div
      role="alert"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "4rem 1.5rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong</h1>
      <p style={{ opacity: 0.7, maxWidth: "32rem" }}>
        {error?.message ?? "An unexpected error occurred."}
      </p>
      <a href="/" style={{ marginTop: "1rem", textDecoration: "underline" }}>
        Return to the homepage
      </a>
    </div>
  );
}
