import {useSelector} from 'react-redux';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import { calculateSubtotal, calculateTotal } from '../../../helper';

const Row = styled(Box)({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
})

export default function CostSummary(props){
    const {cart, checkout} = useSelector(state => state);

    // Shipping cost
    const shippingCost = checkout.shipping.price;

    // Subtotal
    let subtotal = calculateSubtotal(cart);

    return (
        <Box
            display="grid"
            gap="0.5em"
            {...props}
        >
            <Row>
                <Typography variant="body1">Subtotal</Typography>
                <Typography
                    variant="body1"
                    fontWeight="600"
                >
                    ${subtotal}
                </Typography>
            </Row>
            <Row>
                <Typography variant="body1">Shipping</Typography>
                <Typography
                    variant="body1"
                    fontWeight="600"
                >
                    {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                </Typography>
            </Row>
            <Row
                pt="1em"
                borderTop="1px solid lightgray"
            >
                <Typography
                    fontWeight="600"
                >
                    Total
                </Typography>
                <Typography
                    fontWeight="600"
                    fontSize="1.5em"
                >
                    ${calculateTotal(subtotal, shippingCost)}
                </Typography>
            </Row>
        </Box>
    )
}