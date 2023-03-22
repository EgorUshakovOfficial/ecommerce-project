import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ProductImage from '../product/ProductImage';
import ProductControls from '../product/ProductControls';

// Product width and height
const PRODUCT_IMAGE_WIDTH = 100, PRODUCT_IMAGE_HEIGHT = 100;

// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    overflowY:"auto",
    gap:"0.5em",
    minHeight: PRODUCT_IMAGE_HEIGHT,
    borderBottom:"1px solid lightgray",
    padding: theme.spacing(2, 0)
}));

export default function CartItem({
     id,
     name,
     color,
     quantity,
     image,
     cost
}){
    return (
        <StyledCartItem id={id}>
            <ProductImage image={image} style={{width:PRODUCT_IMAGE_WIDTH, height:PRODUCT_IMAGE_HEIGHT}} />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                gap="0.25em"
            >
                <Typography variant="subtitle1" >
                    {name}
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
