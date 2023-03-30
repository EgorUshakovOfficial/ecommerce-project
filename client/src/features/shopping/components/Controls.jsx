import {useDispatch, useSelector} from 'react-redux';
import {Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {ProductControls} from '../../../components';
import {add, remove, increment, decrement} from '../state/cartSlice';

const ControlContainer = styled('div')({
    display:"grid",
    gridTemplateRows:"repeat(2, 1fr)",
    gridTemplateColumns:"repeat(2, 1fr)",
    gap:"0.5em",
});

export default function Controls({quantity, productId}){
    // Cart state
    const cart = useSelector(state => state.cart);

    // Dispatch
    const dispatch = useDispatch();

    // Adds cart item to the cart when clicked
    const addCartItemOnClick = () => {
        // Case 1: Item is in cart
        // Case 2: Item has been already added to cart
        // Case 3: Item is sold out
    };

    return (
        <ControlContainer>
            <ProductControls quantity={quantity} />
            <Typography variant="body1" lineHeight="1.5">
                Only <Typography variant="span" fontWeight="600">{quantity} item</Typography> Left!<br />
                Don't miss it
            </Typography>
            <Button
                disableRipple
                style={{
                    color:"white",
                    background:"black"
                }}
                variant="contained"
                size="large"
            >
                Buy Now
            </Button>
            <Button
                disableRipple
                color="inherit"
                variant="outlined"
                size="large"
                onClick={addCartItemOnClick}
            >
                Add to Cart
            </Button>
        </ControlContainer>
    )
}