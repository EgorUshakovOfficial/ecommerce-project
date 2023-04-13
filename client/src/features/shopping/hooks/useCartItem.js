import {useDispatch} from 'react-redux';
import {decrementProduct, incrementProduct, removeProduct} from '../state/cartSlice';

// Mock data
import { products } from '../../../mock';

export default function useCartItem(cartItem){
    // Product
    const product = products.filter(product => product.productId === cartItem.productId)[0];

    // Dispatch
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

        // Quantity of the product in the shopping cart is one
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