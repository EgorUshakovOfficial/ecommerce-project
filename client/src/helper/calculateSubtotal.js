const calculateSubtotal = cart => {
    let subtotal = cart.reduce(
        (total, {cost, quantity}) => total + cost*quantity, 0
    );

    let roundedSubtotal = Math.round(subtotal * 100)/100;

    return roundedSubtotal;
}

export default calculateSubtotal;