import {useState} from 'react';

export default function useShoppingCart(cart){
    // State of the cart
    const [openCart, setOpenCart] = useState(false);

    // Callbacks on specified events
    const handleCartOpen = () => setOpenCart(true);

    const handleCartClose = () => setOpenCart(false);

    return {handleCartClose, handleCartOpen, openCart}
}