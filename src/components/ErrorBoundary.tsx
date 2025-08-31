import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In a real app, send to monitoring service (Sentry, etc.)
    // eslint-disable-next-line no-console
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-lg w-full text-center">
            <div className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</div>
            <p className="text-gray-600 mb-6">
              An unexpected error occurred while rendering this page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.assign('/')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go to Home
              </button>
            </div>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="text-left text-xs text-red-600 bg-red-50 rounded mt-4 p-3 overflow-auto max-h-48">
                {String(this.state.error.stack || this.state.error)}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
