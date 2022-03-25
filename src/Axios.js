import axios from "axios";
import jwtDecode from "jwt-decode";
const Base_URL = 'https://blog-user-posts-app3.herokuapp.com/'

const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser; // it will retrive the user info as a text from local storage
// the question mark as it may be undefined when user is not logged in.
const currentUser = user && JSON.parse(user); // change it to Json format and extract the userToken from the user Object .
const token = currentUser?.token;
const config = {
    'Authorization': `Bearer ${token}`
}

export function checkToken(): Boolean {
    let tokenCheck = jwtDecode(token);
    if (tokenCheck)
        return true;
    return false;

}
export const publicRequst = axios.create({
    baseURL: Base_URL,

})
export const privateRequst = axios.create({
    baseURL: Base_URL,
    headers: config,
})