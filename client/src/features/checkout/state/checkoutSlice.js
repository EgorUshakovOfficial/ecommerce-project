import {createSlice} from '@reduxjs/toolkit';

// Initial state of the checkout
const initialState = {
    // Personal information
    personal:{
        email:'',
        countryRegion:'',
        firstName:'',
        lastName:'',
        company:'',
        address:'',
        apartmentSuite:'',
        city:'',
        region:'',
        postalCode:''
    },
    // Shipping address
    shipping:{
        shippingMethod:'free-shipping',
        shippingCost:0
    }
};

// Checkout slice
const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        // Populates personal information of the user in the checkout state
        populatePersonal: (state, {payload}) => ({...state, personal:{...payload}}),

        // Populates shipping information of the user in the checkout state
        populateShipping: (state, {payload}) => ({...state, shipping:{...payload}}),
    }
});

export const {populatePersonal, populateShipping} = checkoutSlice.actions;

export default checkoutSlice.reducer;


