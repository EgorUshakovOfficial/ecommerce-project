const validateCardNumber = cardNumber => {
    // Card number regex
    const cardNumberRegex = /^\d{16}$/;

    return cardNumberRegex.test(cardNumber) || cardNumber === "";
};

export default validateCardNumber;