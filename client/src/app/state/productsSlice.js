import { createSlice } from "@reduxjs/toolkit";
import api from '../../services';
import { extraLoadingReducer, extraErrorReducer} from "../extraReducers";

// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null
};

const {getProducts: fetchProducts} = api.products.endpoints;

// Products slice
const productsSlice = createSlice({
    name:"products",
    initialState,
    extraReducers: builder => {
        // Retrieves list of all products from the API endpoint
        builder
        .addMatcher(fetchProducts.matchPending, extraLoadingReducer)
        .addMatcher(
            fetchProducts.matchFulfilled,
            (state, {payload}) => {
                state.loading = false
                state.data = payload
            }
        )
        .addMatcher(fetchProducts.matchRejected, extraErrorReducer)
    }
});

export default productsSlice.reducer;