import {useSelector} from 'react-redux';
import {Fragment} from 'react';
import {Badge, Box, Drawer, Typography, IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import Button from '../../../components/Button';
import CartItem from './CartItem';
import useShoppingCart from '../hooks/useShoppingCart';
import {calculateSubtotal} from '../../../helper';

// Cart header
const DrawerHeader = styled('div')(({theme}) => ({
    display: "flex",
    alignItems:"center",
    padding: theme.spacing(1, 0),
    ...theme.mixins.toolbar,
    borderBottom: "1px solid lightgray",
    justifyContent:"space-between"
}));

// Cart shopping items
const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})
(({theme, open}) => ({
    flexGrow: 1,
    overflowY:"auto",
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default function ShoppingCart(){
    // Cart state
    const cart = useSelector(state => state.cart);

    const {handleCartClose, handleCartOpen, openCart} = useShoppingCart(cart);

    // Subtotal
    let subtotal = calculateSubtotal(cart);

    // Number of products in the shopping cart
    const numItems = cart.length;

    return (
        <Fragment>
            <Badge
                badgeContent={numItems}
                color="primary"
            >
                <IconButton
                    disableRipple
                    style={{
                        color:"inherit",
                        size:"medium",
                        variant:"text",
                        textTransform:"none",
                        background:"transparent",
                        fontSize:"1em"
                    }}
                    aria-label="open cart"
                    onClick={handleCartOpen}
                >
                <ShoppingCartIcon />
                </IconButton>
            </Badge>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper':{
                        paddingInline: "1em",
                        gap:"0.5em"
                    },
                    position:"absolute",
                }}
                variant="persistent"
                anchor="right"
                open={openCart}
            >
                <DrawerHeader>
                    <Typography variant="h4">
                        Cart
                    </Typography>
                    <IconButton
                        disableRipple
                        color="inherit"
                        size="medium"
                        onClick={handleCartClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DrawerHeader>

                {cart.length > 0 ?
                <Fragment>
                    <Main>
                        {cart.map(cartItem => <CartItem cartItem={cartItem} />)}
                    </Main>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="h6" fontWeight="600">Total</Typography>
                        <Typography variant="h6">{subtotal}</Typography>
                    </Box>
                    <Button
                        disableRipple
                        variant="contained"
                        color="success"
                        href="/checkout/information"
                        sx={{mb:"0.5em"}}
                    >
                        Check out
                    </Button>
                </Fragment>
                :
                <Typography>Cart is currently empty</Typography>}
            </Drawer>
        </Fragment>
    )
}