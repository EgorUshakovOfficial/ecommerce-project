import { useSelector } from 'react-redux';
import {Box, Typography, useTheme, useMediaQuery} from '@mui/material';
import CartDetailsCard from './CartDetailsCard';

export default function CartDetails(){
    // Theme API
    const theme = useTheme();

    // Media Query API
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Cart and user states
    const {cart, user} = useSelector(state => state);

    return (
        <Box
            display="flex"
            flexDirection="column"
            // alignItems="center"
        >
            <Typography
                variant="h1"
                fontWeight="600"
                fontSize="2.2em"
                textAlign="center"
            >
                Cart
            </Typography>
            <Typography
                variant="body1"
                color="gray"
                marginTop="0.25em"
                textAlign="center"
            >
                You are eligible for free shipping
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={matchMobile ? "90%" : "repeat(auto-fit, minmax(450px, calc(30% - 1em)))"}
                gap="0.5em"
                justifyContent="center"
                paddingTop="1.5em"
            >
                {cart.map(cartItem => <CartDetailsCard cartItem={cartItem} />)}
            </Box>
        </Box>
    )
}