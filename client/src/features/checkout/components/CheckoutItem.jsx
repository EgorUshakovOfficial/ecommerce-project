import {Typography, Badge} from '@mui/material';
import {ProductImage} from '../../../components';
import Row from '../containers/Row';

export default function CheckoutItem({
    image,
    name,
    color,
    price,
    quantity
}){
    // Amount owed for the quantity of the item selected
    const amount = (price*quantity).toFixed(2);

    return (
        <Row badgeContent={quantity}>
            <Badge>
                <ProductImage image={image} style={{width:64, height:64}} />
            </Badge>
            <Box>
                <Typography
                    variant="subtitle1"
                    gutterBottom
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