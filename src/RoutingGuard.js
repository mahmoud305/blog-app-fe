
import { checkToken } from "./Axios";

import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/RegisterPage";

function RoutingGuard({ path, Component }) {
  
  const user = useSelector((state) => state.currentUser);
  if (user) {
    let isValidToken = checkToken();
    // let isValidToken = true;
    if (!isValidToken) {
      return <Redirect to={"/login"} />
    } else {
      if (path === "/login" || path === "/register")
        return <Redirect to={"/home"} />
      return <Route path={path}>  <Component /> </Route>
    }
  } else {
    console.log("user not Exist");
    if (path === "/register")
      return <Redirect to={"/register"} />  
    else
      return <Redirect to={"/login"} />
         
  }

}

export default RoutingGuard


