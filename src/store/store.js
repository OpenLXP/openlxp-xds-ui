import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from './configuration';

/* Redux Store configuration: we add each reducer here */
export default configureStore({
    reducer: {
        configuration: configurationReducer
    }
});
