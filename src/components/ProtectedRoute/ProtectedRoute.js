import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  return(
    <Route>
      {
        () => isLoggedIn === false ? <Redirect to="./" /> : children
      }
    </Route>
  )
}

export default ProtectedRoute;
