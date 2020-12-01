import { AuthProvider } from "../context/auth-context"
import ErrorFallBack from "./error-fallback"
import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter as Router } from "react-router-dom"

function AppProviders({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export { AppProviders }
