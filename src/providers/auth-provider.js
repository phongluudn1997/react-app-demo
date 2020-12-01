import axios from "axios"

const localStorageKey = "__auth_provider_token__"
const authURL = process.env.REACT_APP_AUTH_URL

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey)
}

const setToken = user => {
  window.localStorage.setItem(localStorageKey, user.token)
}

const login = async ({ username, password }) => {
  const user = await client("login", { username, password })
  return setToken(user)
}

const register = async ({ username, password }) => {
  const user = await client("register", { username, password })
  return setToken(user)
}

const logout = async () => {
  window.localStorage.removeItem(localStorageKey)
}

const client = (endpoint, data) => {
  return axios({
    method: "POST",
    url: `${authURL}/${endpoint}`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export { getToken, login, register, logout }
