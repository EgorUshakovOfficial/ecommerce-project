import {useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, incrementProduct} from '../state/cartSlice';


// Product mock data
import {products} from '../../../mock';

export default function useControls(productId){
    // Quantity to add
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    // Cart state
    const cart = useSelector(state => state.cart);

    // Specified product
    const product = useMemo(() => {
        let product = products.filter(product => product.productId === productId)[0]

        return product;
    }, []);

    // Dispatch
    const dispatch = useDispatch();

    // Adds product to the shopping cart on click
    const addCartItemOnClick = () => {
        // Position of the product in the cart state
        let index = cart.findIndex(cartItem => cartItem.productId === productId);

        // If product is not in the shopping cart, add it
        if (index === -1){
            const payload = {
                productId:product.productId,
                color:product.color,
                cost: product.cost,
                image: product.image,
                name:product.name,
                quantity:quantityToAdd
            };

            dispatch(addProduct(payload));
            return;
        }

        // Increments the quantity of the product in the shopping cart by desired amount
        let cartItem = {...cart[index]};

        if (cartItem.quantity + quantityToAdd <= product.quantity)
            dispatch(incrementProduct({productId: cartItem.productId, quantityToAdd}));
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