import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: (error: Error, reset: () => void) => ReactNode;
  readonly scope?: string;
}

interface ErrorBoundaryState {
  readonly error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.scope ? `:${this.props.scope}` : ''}]`, error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);
    return <DefaultFallback error={error} reset={this.reset} scope={this.props.scope} />;
  }
}

function DefaultFallback({ error, reset, scope }: { error: Error; reset: () => void; scope?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-fog p-8">
      <div className="max-w-lg w-full bg-white border border-zinc-border/50 rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-semibold text-deep-ink">
          {scope ? `Something went wrong in ${scope}` : 'Something went wrong'}
        </h1>
        <p className="mt-2 text-sm text-mid-zinc">
          An unexpected error occurred. You can try again or reload the page.
        </p>
        <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-surface-container-low p-3 text-[11px] text-mid-zinc">
          {error.message}
        </pre>
        <div className="mt-6 flex gap-3">
          <button
            onClick={reset}
            className="corsair-gradient text-white text-sm font-medium rounded-lg px-4 py-2 hover:brightness-110"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium text-mid-zinc hover:text-deep-ink rounded-lg px-4 py-2 border border-zinc-border/50"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}
