import {Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {cartItems} from '../../../mock/cartItems'
import {Section} from '../../../containers';
import {Product} from '../../../components';

// Product gallery
const ProductGallery = styled('div')({
    display: "grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(4, 1fr)",
})

export default function ProductSection(){
    return (
        <Section id="product-gallery-section">
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
        </Section>
    )
}