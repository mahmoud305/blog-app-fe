// import AddPost from "../AddPost/AddPost";

import { privateRequst } from "../../Axios";

export const  AddPost= async (post,setSuccess,setisFetching) =>{
    try {
        const { data } = await privateRequst.post("addPost", post);
        setSuccess(true);
        setisFetching(false);
    } catch (error) {
        console.log("error in adding post\n", error);
        setSuccess(false);
        setisFetching(false);

    }
}