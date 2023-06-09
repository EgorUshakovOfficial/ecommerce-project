import {useDispatch, useSelector} from 'react-redux';
import {
    useDeleteCartItemMutation,
    useUpdateCartItemMutation
} from '../../../services/shoppingApi';
import {decrementProduct, incrementProduct, removeProduct} from '../../../app/state/cartSlice';

export default function useCartItem(cartItem){
    // Products state
    const products = useSelector(state => state.products.data);

    // Delete cart item mutation function
    const [deleteCartItem] = useDeleteCartItemMutation();

    // Update cart item mutation function
    const [updateCartItem] = useUpdateCartItemMutation();

    // Dispatch API
    const dispatch = useDispatch();

    // Specified product that is in cart
    let product = products.filter(product => product.id === cartItem.productId)[0];

    // Increment the quantity of the product in the shopping cart
    const incrementQuantityOnClick = () => {
        // Quantity to add
        let quantityToAdd = 1;

        // New quantity
        let newQuantity = cartItem.quantity + quantityToAdd

        // Quantity of the cart item with addition to the quantity to be added
        // does not exceed the product supply
        if (newQuantity <= product.quantity){
            dispatch(incrementProduct({id: cartItem.id, quantityToAdd}));

            // Send PUT /api/shopping_session/cart/cart_items
            updateCartItem({
                id:cartItem.id,
                product: product.id,
                quantity:newQuantity
            })
            .then(response => response.data)
            .then(data => {})
            .catch(err => {})
        }
    };

    // Decrement the quantity of the product in the shopping cart
    const decrementQuantityOnClick = () => {
        // Payload
        const payload = {id: cartItem.id};

        // If quantity of the product in the shopping cart is one
        // and the desired action is to decrement it,
        // remove the product from the cart
        if (cartItem.quantity === 1){
            dispatch(removeProduct(payload));

            // Send DELETE /api/shopping_session/cart/cart_items
            deleteCartItem({id: cartItem.id})
            .then(response => response.data)
            .then(data => {})
            .catch(err => {})

            return;
        }

        // Otherwise, decrement the quantity by one
        payload.quantityToRemove = 1;
        dispatch(decrementProduct(payload));

        // New quantity
        let newQuantity = cartItem.quantity-payload.quantityToRemove;

        // Sends PUT /api/shopping_session/cart/cart_items request
        updateCartItem({id:cartItem.id, product:product.id , quantity: newQuantity})
        .then(response => response.data)
        .then(data => {})
        .catch(err => {})
    }

    return {decrementQuantityOnClick, incrementQuantityOnClick}
}