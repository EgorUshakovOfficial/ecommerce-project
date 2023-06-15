import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useAddProductToCartMutation, useUpdateCartItemMutation} from '../../../services/shoppingApi';
import {addProduct, incrementCartItem} from '../../../app/state/cartSlice';

export default function useControls(selectedColor){
    // Cart and products state
    const {cart, products, user} = useSelector(state => state);

    // Product Id
    const {productId} = useParams();

    // Dispatch API
    const dispatch = useDispatch();

    // Add product to cart mutation function
    const [addProductToCart] = useAddProductToCartMutation();

    // Update cart item mutation function
    const [updateCartItem] = useUpdateCartItemMutation();

    // State of the quantity to add to the cart
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    // Product
    const product = products.data.filter(product => product.id === productId)[0];

    // Main image
    const mainImage = product.product_images.filter(image => image.main_image)[0];

    // Add product to the shopping cart on click
    const addCartItemOnClick = () => {
        // Finds the position of the cart item with respect to the product's Id number
        let index = cart.findIndex(item => item.productId === productId);

        // If product is not in the shopping cart, add to it
        if (index === -1){
            const payload = {
                id:uuidv4(),
                productId,
                color:selectedColor,
                price: product.price,
                image: mainImage.image_url,
                title:product.title,
                quantity:quantityToAdd
            };

            // Adds product to the cart
            dispatch(addProduct(payload));

            // If user is authenticated, create new cart item and save it in the database
            if (user.data !== null){
                // Sends POST /api/shopping/cart/cart_items
                addProductToCart({id:payload.id, quantity:quantityToAdd, product:productId})
                .then(response => response.data)
                .then(data => {})
                .catch(err => {})
            }

            return;
        }

        // Otherwiese, increments the quantity of the product in the shopping cart by desired amount
        let cartItem = {...cart[index]};

        // New quantity
        let newQuantity = cartItem.quantity + quantityToAdd;

        // If the sum of the quantity of the item in cart and quantity to be added to cart
        // is at most equal to the product quantity, dispatch the increment product against the Redux store
        if (newQuantity <= product.quantity){
            // Dispatch increment product action creator against the store
            dispatch(incrementCartItem({id:cartItem.id, quantityToAdd}));

            // If user is authenticated, update the quantity of the cart item and save it
            if (user.data !== null){
                // Sends PUT /api/shopping/cart/cart_items request
                updateCartItem({id:cartItem.id, product:productId, quantity: newQuantity})
                .then(response => response.data)
                .then(data => {})
                .catch(err => {})
            }
        }

    };

    // Increments the quantity of the product to be added to the shopping cart
    const incrementQuantityToAddOnClick = () => setQuantityToAdd(
        prevState => {
            if (prevState < product.quantity)
                return prevState + 1;

            return prevState;
        }
    );

    // Decrements the quantity of the product to be added to the shopping cart
    const decrementQuantityToAddOnClick = () => setQuantityToAdd(prevState => {
            if (prevState > 1)
                return prevState-1;

            return prevState;
        }
    );

    return {
        addCartItemOnClick,
        decrementQuantityToAddOnClick,
        incrementQuantityToAddOnClick,
        quantityToAdd
    }
}