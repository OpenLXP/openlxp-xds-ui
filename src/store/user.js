import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    status: "idle",
    error: null,
};

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
    //   The endpoint to login a user
    const url = process.env.REACT_APP_AUTH + "login";

    const response = await axios.post(url, data);

    return response.data;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async (data) => {
    //  The endpoint to to logout a user
    console.log(data);
    const url = process.env.REACT_APP_AUTH + "logout/";
    const headers = {
        Authorization: "Token " + data.token,
    };

    const response = await axios.post(url, {}, { headers: headers });
    return response.data;
});

export const registerNewUser = createAsyncThunk(
    "user/registerNewUser",
    async (data) => {
        // The endpoint url
        const url = process.env.REACT_APP_AUTH + "register";

        // Requesting the creation of a new user
        const response = await axios.post(url, data);

        // Returning the response
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [registerNewUser.pending]: (state, action) => {
            state.status = "loading";
            state.user = {
                email: null,
                token: null,
                lastName: null,
                firstName: null,
            };
            state.error = null;
        },
        [registerNewUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = {
                email: action.payload.user.email,
                firstName: action.payload.user.first_name,
                lastName: action.payload.user.last_name,
                token: action.payload.token,
            };
        },
        [registerNewUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [loginUser.pending]: (state, action) => {
            state.status = "loading";
            state.user = null;
            state.error = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = {
                email: action.payload.user.email,
                firstName: action.payload.user.first_name,
                lastName: action.payload.user.last_name,
                token: action.payload.token,
            };
        },
        [loginUser.rejected]: (state, action) => {
            state.status = "failed";
            state.user = null;
            state.error = action.error.message;
        },
        [logoutUser.pending]: (state, action) => {
            state.status = "loading";
            state.error = null;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.user = null;
        },
        [logoutUser.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

// Action creators are generated for each case reducer function
export const { userLoaded } = userSlice.actions;

export default userSlice.reducer;
