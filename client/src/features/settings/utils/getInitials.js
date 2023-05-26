const getInitials = (firstName, lastName) => {
    // First letter of first name
    const firstInitial = firstName.charAt(0);

    // First letter of last name
    const lastInitial = lastName.charAt(0);

    // Initials
    const initials = firstInitial + lastInitial;

    return initials;
}

export default getInitials;