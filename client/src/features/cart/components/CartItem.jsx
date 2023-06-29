import {Box, IconButton, Typography, useMediaQuery, useTheme} from '@mui/material';
import {
    Add as AddIcon,
    Remove as SubtractIcon
} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {Image} from '../../../components';
import QuantityControls from './QuantityControls';
import useCartItem from '../hooks/useCartItem';

// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    gap:"0.25em",
    padding:theme.spacing(1, 2),
    borderBottom:"1px solid lightgray",
}));

export default function CartItem({cartItem, style}){
    const {id, title, image, color, price, quantity} = cartItem;

    const {decrementQuantityOnClick, incrementQuantityOnClick} = useCartItem(cartItem);

    // Theme
    const theme = useTheme();

    // Matches width screen size of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    // Product width and height sizes
    const PRODUCT_IMAGE_WIDTH = matchDesktop ? 100 : 60;
    const PRODUCT_IMAGE_HEIGHT = PRODUCT_IMAGE_WIDTH;

    return (
        <StyledCartItem productId={id} style={style}>
            <Image
                image={image}
                style={{
                    width:PRODUCT_IMAGE_WIDTH,
                    height:PRODUCT_IMAGE_HEIGHT
                }}
            />
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
                <QuantityControls
                    quantity={quantity}
                    incrementQuantityOnClick={incrementQuantityOnClick}
                    decrementQuantityOnClick={decrementQuantityOnClick}
                />
            </Box>
            <Typography variant="subtitle2" fontWeight="600">
                {price}
            </Typography>
        </StyledCartItem>
    );
}
