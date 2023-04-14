// Ensures only name consists of only alpha characters
const validateName = name => {
    const nameRegex = /^[a-zA-Z ]+$/;

    return nameRegex.test(name) || name === "";
}

export default validateName;