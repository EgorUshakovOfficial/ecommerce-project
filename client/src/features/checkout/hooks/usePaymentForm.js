import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { populatePayment } from '../state/checkoutSlice';
import { validateCardNumber, validateExpirationDate, validateName, valida, validateNumber } from '../../../utils/validators';

export default function usePaymentForm(){
    // Dispatch
    const dispatch = useDispatch();

    // Payment
    const {payment} = useSelector(state => state.checkout);

    // Field values
    const [cardNumber, setCardNumber] = useState(payment.cardNumber);

    const [cardholder, setCardholder] = useState(payment.cardholder);

    const [expirationDate, setExpirationDate] = useState(payment.expirationDate);

    const [securityCode, setSecurityCode] = useState(payment.securityCode);

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
    const handlePaymentFormOnClick = (event, payload) => {
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
            dispatch(populatePayment(payload));
        }
    }

    return {
        cardNumber,
        cardholder,
        expirationDate,
        securityCode,
        handleCardNumberOnChange,
        handleCardholderOnChange,
        handleExpirationDateOnChange,
        handlePaymentFormOnClick,
        handleSecurityCodeOnChange
    };
};