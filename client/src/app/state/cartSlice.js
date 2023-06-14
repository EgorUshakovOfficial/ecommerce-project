import {createSlice} from '@reduxjs/toolkit';
import api from '../../services';

// Initial state
const initialState = [];

// Initialize fetch cart items
export const {getCartItems: fetchCartItems, createCart, updateCart} = api.shopping.endpoints;

// Extra loading reducer
const extraLoadingReducer = (state, action) => state;

// Extra fulfilled reducer
const extraFulfilledReducer = (state, {payload}) => {
    console.log("executed...")
    // Cart items retrieved from the API endpoint
    let cart = payload.cart;

    // Extract the needed fields from every item in the cart
    cart = cart.map( ({id:cartItemId, quantity, product}) => {
        // Extract title, price, and product images fields of the product
        const {id:productId, title, price, product_images} = product;

        // Finds the main image
        const mainImage = product_images.filter(image => image.main_image)[0];

        return {
            id:cartItemId,
            productId,
            title,
            price,
            quantity,
            image: mainImage.image_url,
            color: mainImage.color_name
        }
    });

    // Update state to be the cart
    state = [...cart];

    return state;
}

// Extra error reducer
const extraErrorReducer = extraLoadingReducer;

// Cart slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        // Clears cart of all products
        clearCart: (state, action) => [],

        // Adds new product into the cart
        addProduct: (state, action) => state.concat(action.payload), // Rename to addProduct

        // Removes product from the cart
        removeProduct: (state, action) => { // Rename to removeCartItem
            const { payload } = action;

            // Index of the cart item in the array to be removed
            let index = state.findIndex( ({ id }) => payload.id === id);

            // Exclude the cart item from the state
            state = [...state.slice(0, index), ...state.slice(index+1)];

            return state;
        },

        // Increments the quantity of the product in the shopping cart
        incrementProduct: (state, action) => { // Rename to incrementCartItem
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
        decrementProduct: (state, action) => { // Rename to decrementCartItem
            const { payload } = action;

            // Index of the cart item to be decremented
            let index = state.findIndex(({ id }) => payload.id === id);

            // Targeted cart item
            let cartItem = state[index];

            // Decrements the quantity of the cart item by the value in the payload
            cartItem.quantity -= payload.quantityToRemove;

            return state;
        }
    },
    extraReducers: builder => {
        // Retrieves cart items from the API endpoint
        builder
        .addMatcher(fetchCartItems.matchPending, extraLoadingReducer)
        .addMatcher(fetchCartItems.matchFulfilled, extraFulfilledReducer)
        .addMatcher(fetchCartItems.matchRejected, extraErrorReducer)

        // Creates cart items
        builder
        .addMatcher(createCart.matchPending, extraLoadingReducer)
        .addMatcher(createCart.matchFulfilled, extraFulfilledReducer)
        .addMatcher(createCart.matchRejected, extraErrorReducer)

        // Updates cart items
        builder
        .addMatcher(updateCart.matchPending, extraLoadingReducer)
        .addMatcher(updateCart.matchFulfilled, extraFulfilledReducer)
        .addMatcher(updateCart.matchRejected, extraErrorReducer)
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