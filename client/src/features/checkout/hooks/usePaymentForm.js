import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {useAddNewOrderMutation} from '../../../services/orders';
import { validateCardNumber, validateExpirationDate, validateName, validateNumber } from '../../../utils/validators';
import { calculateSubtotal } from '../../../helper';
import { clearOrderError } from '../../../app/state/orderSlice';

export default function usePaymentForm(){
    // Navigate
    const navigate = useNavigate();

    // Dispatch
    const dispatch = useDispatch();

    // Adds new order mutation
    const [addNewOrder] = useAddNewOrderMutation();

    // Checkout
    const {cart, checkout} = useSelector(state => state);

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

    // Clears error in Redux store on click
    const handleCardErrorOnClick = () => dispatch(clearOrderError());

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

        // Both card number and expiration date are valid
        let validData = validateCardNumber(cardNumber) && validateExpirationDate(expirationDate);

        // No missing fields and all required input fields contain valid data
        if (missingFields.length === 0 && validData){

            // Payload
            const payload = {
                cardNumber,
                cardholder,
                expirationDate,
                securityCode,
                subtotal,
                shippingCost:checkout.shipping.price,
            }


            // Sends POST request /api/orders endpoint and processes payment using Stripe API
            let response = await addNewOrder(payload);

            response
            .then(data => {
                // Navigates user to the thank you page if payment is successful
                navigate('/success', {replace:true});
            })
            .catch(err => console.log('Do something with the error')) // Fix this and handle error more elegantly

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