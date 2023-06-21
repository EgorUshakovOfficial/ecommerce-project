import {useState} from 'react';
import {useSelector} from 'react-redux';
import { validateCardNumber, validateExpirationDate, validateName, validateNumber } from '../../../utils/validators';
import { calculateSubtotal } from '../../../helper';

export default function usePaymentForm({addNewOrder, setError}){
    // Checkout
    const {cart, checkout, user} = useSelector(state => state);

    // Subtotal
    let subtotal = calculateSubtotal(cart);

    // 16 digit card number on the debit or credit card
    const [cardNumber, setCardNumber] = useState('');

    // Owner of the card
    const [cardholder, setCardholder] = useState('');

    // Date of expiry in mm/yy format
    const [expirationDate, setExpirationDate] = useState('');

    // CSV code
    const [securityCode, setSecurityCode] = useState('');

    // Handles card number when input is changed
    const handleCardNumberOnChange = event => setCardNumber(event.target.value);

    // Handle card holder when input is changed
    const handleCardholderOnChange = event => setCardholder(prevState => {
        // New cardholder
        let newCardholder = event.target.value;

        return validateName(newCardholder) ? newCardholder : prevState;
    });

    // // Clears error in Redux store on click
    const handleCardErrorOnClick = () => setError('');

    // Handles expiration date as input changes
    const handleExpirationDateOnChange = event => setExpirationDate(event.target.value);

    // Handles and validates security code as input changes
    const handleSecurityCodeOnChange = event => setSecurityCode(prevState => {
        // New security code
        let newSecurityCode = event.target.value;

        // Validates if new security code only contains numerical characters
        return validateNumber(newSecurityCode) ? newSecurityCode : prevState;
    });

    // Handles payment form on click
    const handlePaymentFormOnClick = () => {
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

        // Both card number and expiration date are valid
        let validData = validateCardNumber(cardNumber) && validateExpirationDate(expirationDate);

        // No missing fields and all required input fields contain valid data
        if (missingFields.length === 0 && validData){

            // Payload
            const payload = {
                user: user.data.id,
                personal: checkout.personal,
                shipping: checkout.shipping,
                payment:{
                    cardNumber,
                    cardholder,
                    expirationDate,
                    securityCode
                },
                subtotal: subtotal,
            }

            // Sends POST request /api/orders endpoint and processes payment using Stripe API
            addNewOrder(payload)
        }
    }

    return {
        cardNumber,
        cardholder,
        expirationDate,
        securityCode,
        handleCardErrorOnClick,
        handleCardNumberOnChange,
        handleCardholderOnChange,
        handleExpirationDateOnChange,
        handlePaymentFormOnClick,
        handleSecurityCodeOnChange
    };
};