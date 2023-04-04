const validateAddress = address => {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

    return addressRegex.test(address) || address === "";
}

export default validateAddress;