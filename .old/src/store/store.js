import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from "./configuration";
import userReducer from "./user";
import listsReducer from "./lists";
/* Redux Store configuration: we add each reducer here */
export default configureStore({
    reducer: {
        configuration: configurationReducer,
        user: userReducer,
        lists: listsReducer,
    },
});
