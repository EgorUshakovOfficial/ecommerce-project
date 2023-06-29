import {useDispatch, useSelector} from 'react-redux';
import {useDeleteCartItemMutation, useUpdateCartItemMutation,} from '../../../services/shoppingApi';
import {decrementCartItem, incrementCartItem, removeCartItem} from '../../../app/state/cartSlice';

export default function useCartItem(cartItem){
    // User and products state
    const {products, user} = useSelector(state => state);

    // Dispatch API
    const dispatch = useDispatch();

    // Delete cart item mutation function
    const [deleteCartItem] = useDeleteCartItemMutation();

    // Update cart item mutation function
    const [updateCartItem] = useUpdateCartItemMutation();

    // Specified product that is in cart
    let product = products.data.filter(product => product.id === cartItem.productId)[0];

    // Removes cart item from the cart
    const removeCartItemOnClick = () => {
        // Dispatch remove cart item action with Id number against the store
        dispatch(removeCartItem({id: cartItem.id}));

        // Delete specified cart item from the database if user is authenticated
        if (user.data !== null){
            // Send DELETE /api/shopping/cart/cart_items
            deleteCartItem({id: cartItem.id})
            .then(response => response.data)
            .then(data => {})
            .catch(err => {})
        }
    }

    // Increment the quantity of the product in the shopping cart
    const incrementQuantityOnClick = () => {
        // Quantity to add
        let quantityToAdd = 1;

        // New quantity
        let newQuantity = cartItem.quantity + quantityToAdd

        // Quantity of the cart item with addition to the quantity to be added
        // does not exceed the product supply
        if (newQuantity <= product.quantity){
            dispatch(incrementCartItem({id: cartItem.id, quantityToAdd}));

            // If user is authenticated, permit them to update the quantity of the selected cart item
            if (user.data !== null){
                // Send PUT /api/shopping/cart/cart_items
                updateCartItem({
                    id:cartItem.id,
                    product: product.id,
                    quantity:newQuantity
                })
                .then(response => response.data)
                .then(data => {})
                .catch(err => {})
            }
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
            // Dispatch remove cart item with Id number against the store
            dispatch(removeCartItem(payload));

            // Delete specified cart item from the database if the user is authenticated
            if (user.data !== null){
                deleteCartItem({id: cartItem.id})
                .then(response => response.data)
                .then(data => {})
                .catch(err => {})
            }

            return;
        }

        // Otherwise, decrement the quantity by one
        payload.quantityToRemove = 1;
        dispatch(decrementCartItem(payload));

        // New quantity
        let newQuantity = cartItem.quantity-payload.quantityToRemove;

        // If user is authenticated, permit them to update the quantity of the selected cart item
        if (user.data !== null){
            // Sends PUT /api/shopping/cart/cart_items request
            updateCartItem({id:cartItem.id, product:product.id , quantity: newQuantity})
            .then(response => response.data)
            .then(data => {})
            .catch(err => {})
        }
    }


    return {decrementQuantityOnClick, incrementQuantityOnClick, removeCartItemOnClick}
}