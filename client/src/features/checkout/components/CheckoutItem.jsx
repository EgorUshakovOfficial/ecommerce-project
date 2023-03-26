import {Badge, Box, Typography} from '@mui/material';
import {ProductImage} from '../../../components';
import Row from '../containers/Row';

export default function CheckoutItem({
    image,
    name,
    color,
    cost,
    quantity
}){
    // Amount owed for the quantity of the item selected
    const amount = (cost*quantity).toFixed(2);

    return (
        <Row>
            <Badge badgeContent={quantity} color="primary">
                <ProductImage image={image} style={{width:64, height:64}} />
            </Badge>
            <Box paddingInline="1em">
                <Typography
                    variant="subtitle1"
                >
                    {name}
                </Typography>
                <Typography
                    variant="caption"
                    color="gray"
                >
                    {color}
                </Typography>
            </Box>
            <Typography
                fontWeight="600"
                variant="body1"
            >
                {amount}
            </Typography>
        </Row>
    )
}