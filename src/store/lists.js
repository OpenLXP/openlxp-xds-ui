import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: null,
  status: "idle",
  error: null,
};

export const getLists = createAsyncThunk("lists/getLists", async (data) => {
  const response = {
    data: {
      user: [
        {
          title: "Maths",
          id: 1,
          owner: "John Doe",
          updated: "1/12/2022",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore?",
          courses: [
            {
              title: "Calculus 1A",
              provider: "Han Solo",
              id: "1",
            },
            {
              title: "Calculus 1B",
              provider: "C3P0",
              id: "2",
            },
            {
              title: "Calculus 1C",
              provider: "Chewbacca",
              id: "3",
            },
            {
              title: "Calculus 1E",
              provider: "Yoda",
              id: "4",
            },
          ],
        },
        {
          title: "Data List",
          id: 2,
          owner: "John Doe",
          updated: "1/12/2022",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta cupiditate aperiam expedita aliquid nisi illum eligendi deleniti at ipsam, ratione rem molestiae sit officia repellat dolore dolor voluptate consequuntur hic.",
          courses: [
            {
              title: "Data and the world around you",
              provider: "Yoda",
              id: "5",
            },
            {
              title: "Informed decision making using data analytics",
              provider: "Yoda of dagoba",
              id: "6",
            },
          ],
        },
      ],
      subscribed: [
        {
          title: "Another Math List",
          id: 1,
          owner: "John Doe",
          updated: "1/12/2022",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore?",
          courses: [
            {
              title: "Calculus 1A",
              provider: "Han Solo",
              id: "1",
            },
            {
              title: "Calculus 1B",
              provider: "C3P0",
              id: "2",
            },
            {
              title: "Calculus 1C",
              provider: "Chewbacca",
              id: "3",
            },
            {
              title: "Calculus 1E",
              provider: "Yoda",
              id: "4",
            },
          ],
        },
        {
          title: "Another Data List",
          id: 2,
          owner: "John Doe",
          updated: "1/12/2022",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta cupiditate aperiam expedita aliquid nisi illum eligendi deleniti at ipsam, ratione rem molestiae sit officia repellat dolore dolor voluptate consequuntur hic.",
          courses: [
            {
              title: "Data and the world around you",
              provider: "Yoda",
              id: "5",
            },
            {
              title: "Informed decision making using data analytics",
              provider: "Yoda of dagoba",
              id: "6",
            },
          ],
        },
      ],
    },
  };
  return response.data;
});
export const removeLists = createAsyncThunk(
  "lists/removeLists",
  async (data) => {
    const response = { data: {} };
    return response.data;
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: {
    [getLists.pending]: (state, action) => {
      state.status = "loading";
      state.lists = null;
      state.error = null;
    },
    [getLists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.lists = action.payload;
      state.error = null;
    },
    [getLists.rejected]: (state, action) => {
      state.status = "failed";
      state.lists = null;
      state.error = action.error.message;
    },
    [removeLists.pending]: (state, action) => {
      state.status = "loading";
      state.lists = null;
      state.error = null;
    },
    [removeLists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.lists = null;
      state.error = null;
    },
    [removeLists.rejected]: (state, action) => {
      state.status = "failed";
      state.lists = null;
      state.error = action.error.message;
    },
  },
});

// export const { getLists } = listsSlice.actions;
export default listsSlice.reducer;
