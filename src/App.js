
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/RegisterPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { routingGuard } from "./auth";
import MyAccount from "./Components/MyAccount/MyAccount";
import MyPosts from "./Components/My-Posts/MyPosts";
import AddPost from "./Components/AddPost/AddPost";
import { useHistory } from "react-router-dom";
import { logout } from "./Redux/userRedux";
import PostPage from "./Components/PostHandling/PostPage";


function App() {
  const user = useSelector((state) => state.currentUser);
  const history = useHistory();
  const dispatch =useDispatch()
  function logOut(){
    localStorage.removeItem('persist:root');
    dispatch(logout());
    // history.push('/login');  
  }

  // console.log(user);
  return (
    <Router>
      {user && <Navbar logOut={logOut}/>}
      <Switch>
      
        <Route exact path="/login">
          {routingGuard(user, Login)}
        </Route>
        <Route exact path="/register">
          {routingGuard(user, Register)}
          {/* <Register /> */}
        </Route>
        <Route exact path={"/home"||"/"} >
          {routingGuard(user, Home)}
        </Route>
        <Route exact path="/" >
          {routingGuard(user, Home)}
        </Route>
        <Route exact path="/myPosts/:id" >
          {routingGuard(user, MyPosts)}
        </Route>
        <Route exact path="/myAccount/:id">
          {routingGuard(user, MyAccount)}
        </Route>
        <Route exact path="/updatePost/:id">
          {routingGuard(user, PostPage)}
        </Route>
        <Route exact path="/addPost">
          {routingGuard(user, PostPage)}
        </Route>
        }
      </Switch>
      {/* <Navbar /> */}

      {/* <></Register> */}
      {/* <Home/> */}
      {/* <h2>hello</h2> */}
    </Router>

  );
}

export default App;
