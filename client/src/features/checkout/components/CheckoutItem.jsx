import {Badge, Box, Typography} from '@mui/material';
import {Image} from '../../../components';

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
        <Box
            display="grid"
            gridTemplateColumns="64px 1fr auto"
            gridTemplateRows="64px"
            alignItems="center"
            gap="1em"
        >
            <Badge badgeContent={quantity} color="primary">
                <Image
                    image={image}
                    style={{width:64, height:64}} // Fix this inline style
                />
            </Badge>
            <Box paddingInline="1em">
                <Typography
                    variant="h3"
                    fontSize="1em"
                    fontWeight="600"
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
                display="flex"
                fontWeight="600"
                variant="body1"
                justifyContent="flex-end"
            >
                ${amount}
            </Typography>
        </Box>
    )
}