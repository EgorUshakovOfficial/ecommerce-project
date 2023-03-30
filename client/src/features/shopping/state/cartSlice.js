import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = [];

// Cart slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        add: (state, action) => state.concat(action.payload),

        remove: (state, action) => {
            const { payload } = action;

            // Index of the cart item to be removed
            let index = state.findIndex( ({ productId }) => payload.productId === productId);

            // Exclude the cart item from the state
            state = [...state.slice(0, index), ...state.slice(index+1)];

            return state;
        },

        increment: (state, action) => {
            const { payload } = action;

            // Index of the cart item to be incremented
            let index = state.findIndex(({ productId }) => payload.productId === productId);

            // Targeted cart item
            let cartItem = state[index];

            // Increment the quantity of the cart item by one
            cartItem.quantity += 1;

            return state;
        },

        decrement: (state, action) => {
            const { payload } = action.payload;

            // Index of the cart item to be decremented
            let index = state.findIndex(( {productId} ) => payload.productId === productId);

            // Targeted cart item
            let cartItem = state[index];

            // Decrement the quantity of the cart item by one
            cartItem.quantity -= 1;

            return state;
        }
    }
});

// Actions
export const {add, remove, increment, decrement} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;