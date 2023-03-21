import {Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {cartItems} from '../../../mock/cartItems'
import Product from '../../../components/product/Product';

// Product gallery
const ProductGallery = styled('div')({
    display: "grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(4, 1fr)",
})

export default function ProductSection(){
    return (
        <section id="product-gallery-section">
            <Typography
                variant="h4"
                fontWeight="600"
                gutterBottom
            >
                Headphones For You!
            </Typography>
            <ProductGallery>
                {cartItems.map(product => {
                    // Product information-title, cost, and description
                    const productInfo = {
                        id:product.id,
                        name: product.name,
                        description: product.description,
                        cost: product.cost
                    };

                    return <Product {...productInfo} />
                })}
            </ProductGallery>
        </section>
    )
}