export default function calculateTotal(subtotal, shippingCost){
    let total = subtotal + shippingCost;

    let roundedTotal = Math.round(total * 100) / 100;
    return roundedTotal;
}