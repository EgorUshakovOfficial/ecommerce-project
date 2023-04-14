// Calculates total, determined by subtotal and shipping cost, owed by the customer
export default function calculateTotal(subtotal, shippingCost){
    let total = subtotal + shippingCost;

    // Rounds total to two decimal places
    let roundedTotal = Math.round(total * 100) / 100;

    return roundedTotal;
}