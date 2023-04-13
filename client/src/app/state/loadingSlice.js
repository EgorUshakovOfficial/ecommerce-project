import {createSlice} from '@reduxjs/toolkit';

// Initial state
let initialState = {
    isLoading:false,
    error:null
};

// Loading slice
const loadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        // Initializes loading state
        setLoading: state => ({...state, isLoading:true}),

        // Changes loading state from true to false and sets error
        setError: (state, {payload}) => ({isLoading:false, error:payload}),

        // Changes loading state from true to false and sets no error
        clearLoading: state => ({...state, isLoading:false}),

        // Clears error by setting it to null
        clearError: state => ({...state, error: null})
    }
});

export const {clearError, clearLoading, setError, setLoading} = loadingSlice.actions;

export default loadingSlice.reducer;