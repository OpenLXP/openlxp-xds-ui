import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    configuration: null,
    status: 'idle',
    error: null
}

/* makes an api call to the backend using axios to fetch configuration items */
export const fetchConfiguration =
    createAsyncThunk('configuration/fetchConfiguration', async () => {
        const response =
            await axios.get(process.env.REACT_APP_CONFIGURATION_API);
        return response.data;
});

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchConfiguration.pending]: (state, action) => {
            state.status = 'loading';
            state.configuration = null;
            state.error = null;
        },
        [fetchConfiguration.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.configuration = action.payload;
        },
        [fetchConfiguration.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

// Action creators are generated for each case reducer function
export const { configurationLoaded } = configurationSlice.actions;

export default configurationSlice.reducer;
