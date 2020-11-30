import "./App.css"

import { useAuth } from "./context/auth-context"
import AuthenticatedApp from "./authenticated"

function App() {
  const { user } = useAuth()
  return <div className="App">{user ? <AuthenticatedApp /> : "Login page"}</div>
}

export default App
