// Validates email input
const validateEmail = email => {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return emailRegex.test(email) || email === "";
}

export default validateEmail;