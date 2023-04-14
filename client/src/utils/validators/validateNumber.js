// Ensures input is made up of only numerical characters
const validateNumber = input => {
    const numberRegex = /^[0-9]+$/;

    return numberRegex.test(input) || input === "";
}

export default validateNumber;