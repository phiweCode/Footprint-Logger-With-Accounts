import { useRouteError, isRouteErrorResponse } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  console.error("Route error:", error);

  // Network / fetch-level failure (connection refused, DNS error, etc)
  if (error instanceof TypeError) {
    return (
      <div>
        🚨 Couldn’t reach server. Please check your connection or try again later.
      </div>
    );
  }

  // HTTP errors thrown via Response
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data && <p>{error.data}</p>}
      </div>
    );
  }

  // Other unexpected errors
  if (error instanceof Error) {
    return (
      <div>
        <h1>Oops! Something broke.</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return <div>Unknown error occurred.</div>;
}
