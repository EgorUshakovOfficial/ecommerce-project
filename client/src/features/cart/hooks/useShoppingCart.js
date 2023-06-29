import {useState} from 'react';
import { useSelector } from 'react-redux';
import { calculateSubtotal } from '../../../helper';

export default function useShoppingCart(){
    // Cart and user states
    const {cart, user} = useSelector(state => state);

    // Determines the open state of the cart
    const [openCart, setOpenCart] = useState(false);

    // Number of products in the shopping cart
    const numItems = cart.length;

    // Subtotal
    const subtotal = calculateSubtotal(cart); // Replace this with the state

    // User data
    const userData = user.data;

    // Opens cart on click
    const handleCartOpen = () => setOpenCart(true);

    // Closes cart on click
    const handleCartClose = () => setOpenCart(false);

    return {
        cart,
        handleCartClose,
        handleCartOpen,
        numItems,
        openCart,
        subtotal,
        userData
    }
}