import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
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
    shipping:{
        shippingMethod:'free-shipping',
        shippingCost:0
    },
    payment:{
        cardNumber:'',
        cardholder:'',
        expirationDate:'',
        securityCode:''
    }
};

// Checkout slice
const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        populatePersonal: (state, {payload}) => ({...state, personal:{...payload}}),
        populateShipping: (state, {payload}) => ({...state, shipping:{...payload}}),
        populatePayment: (state, {payload}) => ({...state, payment:{...payload}})
    }
});

export const {populatePersonal, populatePayment, populateShipping} = checkoutSlice.actions;

export default checkoutSlice.reducer;


