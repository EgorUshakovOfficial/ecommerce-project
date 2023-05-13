import {useState} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, incrementProduct} from '../state/cartSlice';
import {useGetProductQuery} from '../../../services/productsApi';

export default function useControls(selectedColor){
    // Product Id
    const {productId} = useParams();

    // Dispatch API
    const dispatch = useDispatch();

    // State of the quantity to add to the cart
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    // Cart state
    const cart = useSelector(state => state.cart);

    // Product
    const {data:product} = useGetProductQuery(productId);

    // Main image
    const mainImage = product.product_images.filter(image => image.main_image)[0];

    // Add product to the shopping cart on click
    const addCartItemOnClick = () => {
        // Position of the product in the array
        let index = cart.findIndex(cartItem => cartItem.id === productId);

        // If product is not in the shopping cart indicated by -1, add it
        if (index === -1){
            const payload = {
                id:product.id,
                color:selectedColor,
                price: product.price,
                image: mainImage.image_url,
                title:product.title,
                quantity:quantityToAdd
            };

            dispatch(addProduct(payload));
            return;
        }

        // Otherwiese, increments the quantity of the product in the shopping cart by desired amount
        let cartItem = {...cart[index]};

        // If the sum of the quantity of the item in cart and quantity to be added to cart
        // is at most equal to the product quantity, dispatch the increment product against the Redux store
        if (cartItem.quantity + quantityToAdd <= product.quantity)
            dispatch(incrementProduct({id: cartItem.id, quantityToAdd}));
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