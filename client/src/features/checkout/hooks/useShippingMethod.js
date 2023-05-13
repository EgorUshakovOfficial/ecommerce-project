import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {populateShipping} from '../state/checkoutSlice';
import { shippingOptions } from '../../../utils/constants';

export default function useShippingMethod(){
    // Dispatch API
    const dispatch = useDispatch();

    // State of the shipping method
    const [shippingMethod, setShippingMethod] = useState('free-shipping');

    // Handles shipping method as input changes
    const handleShippingMethodOnChange = event => {
        // Shipping method value
        let shippingValue = event.target.value;

        // Find shipping method by value
        const shippingOption = shippingOptions.filter(({value}) => value === shippingValue)[0];

        const {value:shippingMethod, price} = shippingOption;

        // Dispatches shipping action against the Redux store on change
        dispatch(populateShipping({shippingMethod, price}))
    }

    // Dispatches shipping actions against the Redux store on click
    const handleShippingMethodOnClick = (event, payload) => dispatch(populateShipping(payload));

    return {
        shippingMethod,
        handleShippingMethodOnClick,
        handleShippingMethodOnChange
    }
}