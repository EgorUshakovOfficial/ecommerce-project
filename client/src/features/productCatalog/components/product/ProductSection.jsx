import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import Product from './Product';

// Product gallery
const ProductGallery = styled(Box)({
    display: "grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))",
})

export default function ProductSection({products}){
    // Theme
    const theme = useTheme();

    // Matches screen sizes with width up to and including 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            variant="section"
            id="product-gallery-section"
            paddingBlock="2em"
            sx={{
                width:matchDesktop ? "100%" : "90%",
                marginInline:"auto"
            }}
        >
            <Typography
                variant="h4"
                fontWeight="600"
                fontSize={matchDesktop ? "2.1em" : "1.5em"}
                gutterBottom
            >
                Headphones For You!
            </Typography>
            <ProductGallery
                sx={{
                    gridTemplateColumns:matchDesktop
                    ? "repeat(auto-fill, minmax(350px, 1fr))" : "100%"
                }}
            >
                {products.map(product => <Product key={product.id} product={product} />)}
            </ProductGallery>
        </Box>
    )
}