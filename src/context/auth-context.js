import * as React from "react"

import { useAsync } from "../utils/hooks/useAsync"
import * as auth from "../providers/auth-provider"
import { client } from "../utils/api-clients"

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
    error,
    setData,
    execute,
  } = useAsync()

  React.useEffect(() => {
    execute(client("me", { token: localStorage.getItem("token") }))
  }, [execute])

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

  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({
      login,
      register,
      user,
      logout,
    }),
    [login, logout, register, user]
  )

  if (isLoading) return <h1>Loading...</h1>

  if (isError) return <h1>Error: {error.message}</h1>

  if (isSuccess) return <AuthContext.Provider value={value} {...props} />
  else throw new Error("Unhandle status")
}

export { useAuth, AuthProvider }
