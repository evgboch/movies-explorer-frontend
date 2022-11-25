import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  return(
    <Route>
      {
        () => isLoggedIn === true ? children : <Redirect to="./" />
      }
    </Route>
  )
}

export default ProtectedRoute;
