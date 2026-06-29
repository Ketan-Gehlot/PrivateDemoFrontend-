import React from "react";
import { ErrorState } from "@/components/common/StateViews";

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: ""
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="p-6">
          <ErrorState message={this.state.message || "The application hit an unexpected error."} />
        </main>
      );
    }

    return this.props.children;
  }
}
