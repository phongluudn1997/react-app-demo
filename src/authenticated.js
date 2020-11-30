import * as React from "react"
import { Switch, Route } from "react-router-dom"
import { Posts } from "./pages/posts"

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route path="/">
        <Posts />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
    </Switch>
  )
}

export default AuthenticatedApp
