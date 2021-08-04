import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: null,
  status: "idle",
  error: null,
};

export const getUserLists = createAsyncThunk(
  "lists/getUserLists",
  async (token) => {
    const url = process.env.REACT_APP_INTEREST_LISTS;
    const response = await axios.get(
      process.env.REACT_APP_INTEREST_LISTS,
      { headers: { Authorization: "token " + token } }
    );
    return response.data;
  }
);
// export const removeLists = createAsyncThunk(
//   "lists/removeLists",
//   async (data) => {
//     const response = { data: {} };
//     return response.data;
//   }
// );

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    removeLists: (state) => {
      state.lists = null;
    },
  },
  extraReducers: {
    [getUserLists.pending]: (state, action) => {
      state.status = "loading";
      state.lists = null;
      state.error = null;
    },
    [getUserLists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.lists = action.payload;
      state.error = null;
    },
    [getUserLists.rejected]: (state, action) => {
      state.status = "failed";
      state.lists = null;
      state.error = action.error.message;
    },
  },
});
export const { removeLists } = listsSlice.actions;
export default listsSlice.reducer;
