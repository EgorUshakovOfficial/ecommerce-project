import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {populateShipping} from '../state/checkoutSlice';

export default function useShippingMethod(){
    // Dispatch
    const dispatch = useDispatch();

    // State of the shipping method
    const [shippingMethod, setShippingMethod] = useState('free-shipping');

    // Handles shipping method on change
    const handleShippingMethodOnChange = event => setShippingMethod(event.target.value);

    // Handles shipping form on click
    const handleShippingMethodOnClick = (event, payload) => dispatch(populateShipping(payload));

    return {
        shippingMethod,
        handleShippingMethodOnClick,
        handleShippingMethodOnChange
    }
}