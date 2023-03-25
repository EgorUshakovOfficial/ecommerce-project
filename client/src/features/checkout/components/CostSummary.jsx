import {Box, Typography} from '@mui/material';
import { calculateTotal } from '../../../helper';
import Row from '../containers/Row';

export default function CostSummary({subtotal, shippingCost}){
    return (
        <Box>
            <Row>
                <Typography variant="body1">Subtotal</Typography>
                <Typography
                    variant="body1"
                    fontWeight="600"
                >
                    {subtotal}
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
            <Row>
                <Typography>Total</Typography>
                <Typography>{calculateTotal(subtotal, shippingCost)}</Typography>
            </Row>
        </Box>
    )
}