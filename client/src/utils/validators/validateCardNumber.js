// Ensures card number is made up of exactly 16 numerical characters
const validateCardNumber = cardNumber => {
    // Card number regex
    const cardNumberRegex = /^\d{16}$/;

    return cardNumberRegex.test(cardNumber) || cardNumber === "";
};

export default validateCardNumber;