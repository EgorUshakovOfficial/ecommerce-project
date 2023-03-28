import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import {cartItems} from '../../../mock/cartItems'
import {Product} from '../../../components';

// Product gallery
const ProductGallery = styled(Box)({
    display: "grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))"
})

export default function ProductSection(){
    // Theme
    const theme = useTheme();

    // Matches screen sizes with width up to and including 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            variant="section"
            id="product-gallery-section"
            paddingBlock="2em"
        >
            <Typography
                variant="h4"
                fontWeight="600"
                gutterBottom
            >
                Headphones For You!
            </Typography>
            <ProductGallery width={matchDesktop ? "100%" : "90%"}>
                {cartItems.map(product => <Product {...product} />)}
            </ProductGallery>
        </Box>
    )
}