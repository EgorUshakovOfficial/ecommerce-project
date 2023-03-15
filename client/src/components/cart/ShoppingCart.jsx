import {Fragment, useState} from 'react';
import {Drawer, Button, Typography, IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import CartItem from './CartItem';
import {cartItems} from '../../data/mock/cartItems';
import { DRAWER_WIDTH } from '../../data/constants/cartConstants';

// Cart header
const DrawerHeader = styled('div')(({theme}) => ({
    display: "flex",
    alignItems:"center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent:"space-between"
}));

// Cart shopping items
const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})
(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -DRAWER_WIDTH,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));

export default function ShoppingCart(){
    const [openCart, setOpenCart] = useState(false);

    const handleCartOpen = () => setOpenCart(true);

    const handleCartClose = () => setOpenCart(false);

    return (
        <Fragment>
            <Button
                disableRipple
                color="inherit"
                size="medium"
                variant="text"
                aria-label="open cart"
                onClick={handleCartOpen}
                endIcon={<ShoppingCartIcon />}
            >
                Cart
            </Button>
            <Drawer
                sx={{width: DRAWER_WIDTH}}
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
                <Main>
                    {cartItems.length === 0 && <Typography variant="body2">Cart is empty</Typography>}
                    {cartItems.map(product => <CartItem {...product} />)}
                </Main>
            </Drawer>
        </Fragment>
    )
}