import {useState} from 'react';

export default function usePaymentForm(){
    // Field values
    const [cardNumber, setCardNumber] = useState('');

    const [cardholder, setCardholder] = useState('');

    const [expirationDate, setExpirationDate] = useState('');

    const [securityCode, setSecurityCode] = useState('');

    // Handles on change events
    const handleCardNumberOnChange = event => setCardNumber(event.target.value);

    const handleCardholderOnChange = event => setCardholder(event.target.value);

    const handleExpirationDateOnChange = event => setExpirationDate(event.target.value);

    const handleSecurityCodeOnChange = event => setSecurityCode(event.target.value);

    return {
        cardNumber,
        cardholder,
        expirationDate,
        securityCode,
        handleCardNumberOnChange,
        handleCardholderOnChange,
        handleExpirationDateOnChange,
        handleSecurityCodeOnChange
    };
};