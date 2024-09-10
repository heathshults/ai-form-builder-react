import React from 'react';


export interface FallbackComponentProps {
    error?: Record<string, unknown>
    resetErrorBoundary: () => void
}
let errorMessage: string | null = null;

export function FallbackComponent({ error, resetErrorBoundary }: FallbackComponentProps) {
    resetErrorBoundary = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        window.location.reload(false);
        errorMessage = error ? error.message : null;
    }
    

  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{errorMessage}</pre>
      <p><a href="#" onClick={resetErrorBoundary}>Reset</a></p>
    </div>
  );

}
export default FallbackComponent;

/*
<ErrorBoundary
  FallbackComponent={Fallback}
  onReset={(details) => {
    // Reset the state of your app so the error doesn't happen again
  }}
>
  <ExampleApplication />
</ErrorBoundary>;
    return <>ErrorBoundaryFallbackComponent</>;
};
*/