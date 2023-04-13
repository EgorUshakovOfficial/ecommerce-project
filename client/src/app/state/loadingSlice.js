import {createSlice} from '@reduxjs/toolkit';

// Initial state
let initialState = false;

// Loading slice
const loadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        startLoading: () => true,
        finishLoading: () => false
    }
});

export const {startLoading, finishLoading} = loadingSlice.actions;

export default loadingSlice.reducer;