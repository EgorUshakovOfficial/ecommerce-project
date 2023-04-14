// Calculates the subtotal of all the cart items
const calculateSubtotal = cart => {
    let subtotal = cart.reduce(
        (total, {cost, quantity}) => total + cost*quantity, 0
    );

    // Rounds subtotal to two decimal places
    let roundedSubtotal = Math.round(subtotal * 100)/100;

    return roundedSubtotal;
}

export default calculateSubtotal;