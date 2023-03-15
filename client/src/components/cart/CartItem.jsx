import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import ProductImage from '../product/ProductImage';
import ProductControls from '../product/ProductControls';

// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    overflowY:"auto",
    padding: theme.spacing(1)
}));

export default function CartItem({title, color, }){
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
                <ProductControls />
            </Box>
            <Typography variant="subtitle2">
                {cost}
            </Typography>
        </StyledCartItem>
    );
}
