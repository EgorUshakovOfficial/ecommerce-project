const validateNumber = number => {
    const numberRegex = /^[0-9]+$/;

    return numberRegex.test(number) || number === "";
}

export default validateNumber;