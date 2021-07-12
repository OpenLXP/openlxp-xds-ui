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
  reducers: {
    setUserStatus: (state) => {
      try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
          state.user = null;
        }
        const stateObject = JSON.parse(serializedState);
        state.status = "succeeded";
        state.user = {
          email: stateObject.user.email,
          firstName: stateObject.user.first_name,
          lastName: stateObject.user.last_name,
          token: stateObject.token,
          userLists: [
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
        };
      } catch (err) {
        state.status = "idle";
        state.user = null;
      }
    },
  },
  extraReducers: {
    [registerNewUser.pending]: (state, action) => {
      state.status = "loading";
      state.user = null;
      state.error = null;
    },
    [registerNewUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      localStorage.setItem("state", JSON.stringify(action.payload));
      state.user = {
        email: action.payload.user.email,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        token: action.payload.token,
      };
    },
    [registerNewUser.rejected]: (state, action) => {
      state.status = "failed";
      state.user = null;
      state.error = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
      state.user = null;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      localStorage.setItem("state", JSON.stringify(action.payload));
      state.user = {
        email: action.payload.user.email,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        token: action.payload.token,
        userLists: [
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
      localStorage.removeItem("state");
    },
    [logoutUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoaded, setUserStatus } = userSlice.actions;

export default userSlice.reducer;
