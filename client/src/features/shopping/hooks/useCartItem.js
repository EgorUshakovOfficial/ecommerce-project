import {useDispatch} from 'react-redux';
import {decrementProduct, incrementProduct, removeProduct} from '../state/cartSlice';

// Mock data-replace with data from the database
import { products } from '../../../mock';

export default function useCartItem(cartItem){
    // Specified product that is in cart
    const product = products.filter(product => product.productId === cartItem.productId)[0];

    // Dispatch API
    const dispatch = useDispatch();

    // Increment the quantity of the product in the shopping cart
    const incrementQuantityOnClick = () => {
        // Quantity to add
        let quantityToAdd = 1;

        // Quantity of the cart item with addition to the quantity to be added
        // does not exceed the product supply
        if (cartItem.quantity + quantityToAdd <= product.quantity){
            dispatch(incrementProduct({productId: cartItem.productId, quantityToAdd}));
        }
    };

    // Decrement the quantity of the product in the shopping cart
    const decrementQuantityOnClick = () => {
        // Payload
        const payload = {productId: cartItem.productId};

        // If quantity of the product in the shopping cart is one
        // and the desired action is to decrement it,
        // remove the product from the cart
        if (cartItem.quantity === 1){
            dispatch(removeProduct(payload));
            return;
        }

        // Otherwise, decrement the quantity by one
        payload.quantityToRemove = 1;
        dispatch(decrementProduct(payload));
    }

    return {decrementQuantityOnClick, incrementQuantityOnClick}
}