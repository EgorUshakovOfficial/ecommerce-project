export default function calculateTotal(subtotal, shippingCost){
    // Total amount
    let total = subtotal + shippingCost;

    return total.toFixed(2);
}