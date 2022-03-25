import Login from "./Components/Login/Login";
import Register from "./Components/Register/RegisterPage";
import Home from "./Components/Home/Home";
import { checkToken } from "./Axios";

export function routingGuard(user, Component) {
  let isTokenValid = checkToken()
  if (user && isTokenValid) {
    if (Component === Login || Component === Register)
      Component = Home;
    return <Component />
  } else {
    if (!isTokenValid)
      alert("your sessions has expired plaese sign in again.");
    // console.log("else");
    if (Component !== Register) {
      // console.log("is register");
      return <Login />

    }
    else {
      // console.log("is Login");


      return <Component />
    }
  }

}

