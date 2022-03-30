import axios from "axios";
import { store } from "./Redux/store"
import jwtDecode from "jwt-decode";

import { logout } from "./Redux/userRedux";
const Base_URL = 'https://blog-user-posts-app3.herokuapp.com/'

// const user = localStorage.getItem("currentUser"); // it will retrive the user info as a text from local storage
const user = JSON.parse(localStorage.getItem("persist:root")); // it will retrive the user info as a text from local storage
const currentUser = user && JSON.parse((user).currentUser);
// const currentUser= JSON.parse(user);
console.log(currentUser);
// the question mark as it may be undefined when user is not logged in.
//  // change it to Json format and extract the userToken from the user Object .
// 
let token = currentUser?.token;
const config = {
    'Authorization': `Bearer ${token}`
}


export function checkToken(): Boolean {

    if (token) {
        let { exp } = jwtDecode(token); // note that jwtDecode doesnot check for the expiration date
        console.log("token check is");
        if (Date.now() >= exp * 1000) {// check if it is less than the expiration data 
            console.log(token);
            store.dispatch(logout());
            console.log("invalid token please sign in again");
            return false;
        }
    }
    return true;

}
export const publicRequst = axios.create({
    baseURL: Base_URL,

})
export const privateRequst = axios.create({
    baseURL: Base_URL,
    headers: config,
})