import { createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser:   null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            
            state.currentUser = null;
            state.isFetching= false;
            state.error= false;
        },

    },
});




export const { loginStart, loginFailure, loginSuccess ,logout} = userSlice.actions;
export default userSlice.reducer;
