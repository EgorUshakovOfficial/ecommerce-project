import {Fragment, useState} from 'react';
import {Box, Drawer, Typography, IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import Button from '../Button';
import CartItem from './CartItem';
import {products} from '../../mock/products';

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
    // State of the cart
    const [openCart, setOpenCart] = useState(false);

    // Callbacks on specified events
    const handleCartOpen = () => setOpenCart(true);

    const handleCartClose = () => setOpenCart(false);

    return (
        <Fragment>
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

                {products.length > 0 ?
                <Fragment>
                    <Main>
                        {products.map(product => <CartItem {...product} />)}
                    </Main>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="h6" fontWeight="600">Total</Typography>
                        <Typography variant="h6">60.00</Typography>
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