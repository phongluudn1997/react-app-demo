import * as React from "react"

import { useAsync } from "../utils/hooks/useAsync"
import * as auth from "../providers/auth-provider"

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider!")
  }
  return context
}

const AuthProvider = props => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    status,
    error,
    setData,
    execute,
  } = useAsync()

  const login = React.useCallback(
    form => {
      auth.login(form).then(user => setData(user))
    },
    [setData]
  )

  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData]
  )

  const value = React.useMemo(
    () => ({
      login,
      register,
    }),
    [login, register]
  )

  return <AuthContext.Provider value={value} {...props} />
}

export { useAuth, AuthProvider }
