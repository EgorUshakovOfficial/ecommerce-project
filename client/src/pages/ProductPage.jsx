import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import { Box } from '@mui/material';
import {styled} from '@mui/material/styles';
import {Container, Section} from '../containers';
import {AnnouncementBar, Nav} from '../components';
import { ImageGallery, Content} from "../features/shopping";
import { calculateHalfCost } from '../helper';

// Mock data (replace with context API)
import {cartItems as products} from '../mock/cartItems';

const ProductContainer = styled(Box)({
    display:"flex",
    justifyContent:"space-evenly"
});

export default function ProductPage({
    name,
    description,
    monthlyPrice,
    yearlyPrice,
    numReviews,
    avgRating
}){

    // Url parameters
    const {productId} = useParams();

    // Specified product
    const product = products.filter(product => product.id == productId)[0];

    return (
        <Fragment>
            <AnnouncementBar />
            <Container>
                <Nav />
                <Section>
                    <ProductContainer>
                        <ImageGallery
                            mainImage={product.image}
                            otherImages={product.otherImages}
                        />
                        <Content
                            name={product.name}
                            description={product.description}
                            numReviews={product.reviews.numReviews}
                            avgRating={product.reviews.avgRating}
                            halfMonthlyPrice={calculateHalfCost(product.cost)}
                            cost={product.cost}
                            quantity={product.quantity}
                        />
                    </ProductContainer>
                </Section>
            </Container>
        </Fragment>
    )
}