import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {useAddNewOrderMutation} from '../services/checkoutApi';
import {startLoading, finishLoading} from '../../../app/state/loadingSlice';
import { validateCardNumber, validateExpirationDate, validateName, validateNumber } from '../../../utils/validators';
import { calculateSubtotal } from '../../../helper';

export default function usePaymentForm(){
    // Navigate
    const navigate = useNavigate();

    // Dispatch
    const dispatch = useDispatch();

    // Adds new order mutation
    const [addNewOrder] = useAddNewOrderMutation();

    // Checkout
    const {cart, checkout} = useSelector(state => state);

    const state = useSelector(state => state);

    console.log(state);

    // Subtotal
    let subtotal = calculateSubtotal(cart);

    // Field values
    const [cardNumber, setCardNumber] = useState('');

    const [cardholder, setCardholder] = useState('');

    const [expirationDate, setExpirationDate] = useState('');

    const [securityCode, setSecurityCode] = useState('');

    const [error, setError] = useState('');

    // Handles on change events
    const handleCardNumberOnChange = event => setCardNumber(event.target.value);

    const handleCardholderOnChange = event => setCardholder(prevState => {
        // New cardholder
        let newCardholder = event.target.value;

        return validateName(newCardholder) ? newCardholder : prevState;
    });

    const handleExpirationDateOnChange = event => setExpirationDate(event.target.value);

    const handleSecurityCodeOnChange = event => setSecurityCode(prevState => {
        // New security code
        let newSecurityCode = event.target.value;

        return validateNumber(newSecurityCode) ? newSecurityCode : prevState;
    });

    // Handles payment form on click
    const handlePaymentFormOnClick = async () => {
        // Required payment form fields
        const requiredFields = document.querySelectorAll('input[required]');

        // Missing fields
        const missingFields = [];

        // Adds required fields that are empty into the missing fields array
        requiredFields.forEach(input => {
            if (input.value === ""){
                missingFields.push(input);
            }
        });

        // Styles missing fields with red border
        missingFields.forEach(input => {
            input.classList.add('error')
        });

        // Validate payment data
        let validData = validateCardNumber(cardNumber) || validateExpirationDate(expirationDate);

        // Send request to Stripe API
        if (missingFields.length === 0 && validData){
            // Payload
            const payload = {
                cardNumber,
                cardholder,
                expirationDate,
                securityCode,
                subtotal,
                shippingCost:checkout.shipping.shippingCost,
            }

            try{
                // Change state of the loading application from false to true
                dispatch(startLoading());

                // Sends POST request to /api/orders
                let response = await addNewOrder(payload).unwrap()

                // Navigates user to the thank you page
                navigate('/success', {replace:true});
            }

            catch(err){
                setError("An error has occurred!")
            }

            finally{
                // Changes the loading state from true to false
                dispatch(finishLoading());
            }
        }
    }

    return {
        cardNumber,
        cardholder,
        error,
        expirationDate,
        securityCode,
        handleCardNumberOnChange,
        handleCardholderOnChange,
        handleExpirationDateOnChange,
        handlePaymentFormOnClick,
        handleSecurityCodeOnChange
    };
};