
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
import RoutingGuard  from "./RoutingGuard";
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
    <Router  >
      { user &&< Navbar logOut={logOut}/>}
      <Switch>
      
        <Route   exact path="/login">
        {user? <Redirect to={"/home"}/>:  <Login/> }
        </Route>
        <Route   exact path="/register" >
        {user? <Redirect to={"/home"}/>:  <Register/> }
        </Route>
 
        <RoutingGuard   path="/home" Component={Home} >
         
        </RoutingGuard>
     
        <RoutingGuard   path="/myPosts/:id" Component={MyPosts} >
      
        </RoutingGuard>
        <RoutingGuard   path="/myAccount/:id" Component={MyAccount}>
       
        </RoutingGuard>
        <RoutingGuard   path="/updatePost/:id" Component={PostPage}>
     
        </RoutingGuard>
        <RoutingGuard   path="/addPost" Component={PostPage}>
  
        </RoutingGuard>
        <Route path="/" render={()=> <Redirect to="/home"/>} /> 
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
