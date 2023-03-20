import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ProductImage from '../product/ProductImage';
import ProductControls from '../product/ProductControls';
import { PRODUCT_IMAGE_HEIGHT } from '../../data/constants/productConstants';

// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    overflowY:"auto",
    gap:"0.5em",
    minHeight: PRODUCT_IMAGE_HEIGHT,
    borderBottom:"1px solid lightgray",
    padding: theme.spacing(2, 0)
}));

export default function CartItem({
     id,
     title,
     color,
     quantity,
     cost
}){
    return (
        <StyledCartItem id={id}>
            <ProductImage />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                gap="0.25em"
            >
                <Typography variant="subtitle1" >
                    {title}
                </Typography>
                <Typography variant="body2">
                    {color}
                </Typography>
                <ProductControls quantity={quantity} />
            </Box>
            <Typography variant="subtitle2" fontWeight="600">
                {cost}
            </Typography>
        </StyledCartItem>
    );
}
