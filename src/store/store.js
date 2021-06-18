import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from "./configuration";
import userReducer from "./user";
/* Redux Store configuration: we add each reducer here */
export default configureStore({
    reducer: {
        configuration: configurationReducer,
        user: userReducer,
    },
});
