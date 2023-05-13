import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = [];

// Cart slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        // Clears cart of all products
        clearCart: () => [],

        // Adds new product into the cart
        addProduct: (state, action) => state.concat(action.payload),

        // Removes product from the cart
        removeProduct: (state, action) => {
            const { payload } = action;

            // Index of the cart item in the array to be removed
            let index = state.findIndex( ({ id }) => payload.id === id);

            // Exclude the cart item from the state
            state = [...state.slice(0, index), ...state.slice(index+1)];

            return state;
        },

        // Increments the quantity of the product in the shopping cart
        incrementProduct: (state, action) => {
            const { payload } = action;

            // Index of the cart item to be incremented
            let index = state.findIndex(({ id }) => payload.id === id);

            // Targeted cart item
            let cartItem = state[index];

            // Increment the quantity of the cart item by the value in the payload
            cartItem.quantity += payload.quantityToAdd;

            return state;
        },

        // Decrements the quantity of the product in the shopping cart
        decrementProduct: (state, action) => {
            const { payload } = action;

            // Index of the cart item to be decremented
            let index = state.findIndex(({ id }) => payload.id === id);

            // Targeted cart item
            let cartItem = state[index];

            // Decrements the quantity of the cart item by the value in the payload
            cartItem.quantity -= payload.quantityToRemove;

            return state;
        }
    }
});

// Actions
export const {
    addProduct,
    clearCart,
    removeProduct,
    incrementProduct,
    decrementProduct
} = cartSlice.actions;

// Reducer
export default cartSlice.reducer;