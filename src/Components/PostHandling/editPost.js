import { privateRequst } from "../../Axios";

export const editPost = async (id,post ,setSuccess,setisFetching)=> {

    try {
        const { data } = await privateRequst.put(`editPost/${id}`, post);
        setSuccess(true);
        setisFetching(false);
    } catch (error) {
        console.log("error in adding post\n", error);
        setSuccess(false);
        setisFetching(false);

    }
} 