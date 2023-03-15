import {Fragment, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Drawer, Button, Typography, IconButton} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { DRAWER_WIDTH } from '../../data/constants/cartConstants';



// Cart header
const DrawerHeader = styled('div')(({theme}) => ({
    display: "flex",
    alignItems:"center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent:"space-between"
}));

// Cart content


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
                        onClick={handleCarClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DrawerHeader>
            </Drawer>
        </Fragment>
    )
}