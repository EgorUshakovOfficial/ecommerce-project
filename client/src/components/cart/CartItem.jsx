import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ProductImage from '../product/ProductImage';
import ProductControls from '../product/ProductControls';

// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    overflowY:"auto",
}));

export default function CartItem({
     title,
     color,
     quantity,
     cost
}){
    return (
        <StyledCartItem>
            <ProductImage />
            <Box>
                <Typography variant="subtitle2" gutterBottom >
                    {title}
                </Typography>
                <Typography variant="body2">
                    {color}
                </Typography>
                <ProductControls quantity={quantity} />
            </Box>
            <Typography variant="subtitle2">
                {cost}
            </Typography>
        </StyledCartItem>
    );
}
