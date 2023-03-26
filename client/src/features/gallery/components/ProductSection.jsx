import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {cartItems} from '../../../mock/cartItems'
import {Product} from '../../../components';

// Product gallery
const ProductGallery = styled('div')({
    display: "grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(4, 1fr)",
})

export default function ProductSection(){
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
            <ProductGallery>
                {cartItems.map(product => <Product {...product} />)}
            </ProductGallery>
        </Box>
    )
}