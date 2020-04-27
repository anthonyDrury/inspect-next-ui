import React, { ErrorInfo } from "react";
import { SendError } from "../../common/analytics";

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, info: ErrorInfo): void {
    SendError(error, info);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
