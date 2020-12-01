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
    isIdle,
    isError,
    error,
    setData,
    execute,
  } = useAsync()

  const getUser = async () => {
    const token = await auth.getToken()
    if (!token) return
    return await client("users/me", { token })
  }

  React.useEffect(() => {
    execute(getUser())
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

  if (isLoading || isIdle) return <h1>Loading...</h1>

  if (isError) {
    throw error
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  } else {
    throw new Error("Unhandle error")
  }
}
export { useAuth, AuthProvider }
