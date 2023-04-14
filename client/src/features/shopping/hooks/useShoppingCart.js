import {useState} from 'react';

export default function useShoppingCart(){
    // Determines the open state of the cart
    const [openCart, setOpenCart] = useState(false);

    // Opens cart on click
    const handleCartOpen = () => setOpenCart(true);

    // Closes cart on click
    const handleCartClose = () => setOpenCart(false);

    return {handleCartClose, handleCartOpen, openCart}
}