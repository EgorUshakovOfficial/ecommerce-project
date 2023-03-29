import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import ProductImage from '../product/ProductImage';
import ProductControls from '../product/ProductControls';


// Cart item container
const StyledCartItem = styled('div')( ({theme}) => ({
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    gap:"0.25em",
    padding:theme.spacing(1, 2),
    borderBottom:"1px solid lightgray",
}));

export default function CartItem(props){
    const {id, name, color, quantity, image, cost} = props;

    // Theme
    const theme = useTheme();

    // Matches width screen size of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    // Product width and height sizes
    const PRODUCT_IMAGE_WIDTH = matchDesktop ? 100 : 60;
    const PRODUCT_IMAGE_HEIGHT = PRODUCT_IMAGE_WIDTH;


    return (
        <StyledCartItem id={id} style={props.style}>
            <ProductImage
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
