import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {populateShipping} from '../state/checkoutSlice';

export default function useShippingMethod(){
    // Dispatch API
    const dispatch = useDispatch();

    // State of the shipping method
    const [shippingMethod, setShippingMethod] = useState('free-shipping');

    // Handles shipping method as input changes
    const handleShippingMethodOnChange = event => setShippingMethod(event.target.value);

    // Dispatches shipping actions against the Redux store on click
    const handleShippingMethodOnClick = (event, payload) => dispatch(populateShipping(payload));

    return {
        shippingMethod,
        handleShippingMethodOnClick,
        handleShippingMethodOnChange
    }
}