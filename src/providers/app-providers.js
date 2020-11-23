import { AuthProvider } from "../context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  );
}

export { AppProviders };
