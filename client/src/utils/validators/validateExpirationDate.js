// Ensures expiration date is in mm/yy format
const validateExpirationDate = expirationDate => {
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    return expirationDateRegex.test(expirationDate) || expirationDate === "";
}

export default validateExpirationDate;