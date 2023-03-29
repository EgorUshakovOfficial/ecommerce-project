import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {Box, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Container} from '../containers';
import {AnnouncementBar, Nav} from '../components';
import { ImageGallery, Content} from "../features/shopping";
import { calculateHalfCost } from '../helper';

// Mock data (replace with context API)
import {cartItems as products} from '../mock/cartItems';

const ProductContainer = styled(Box)({
    display:"flex",
    gap:"0.5em",
    justifyContent:"space-evenly",
    paddingBlock:"2em",
    marginInline:"auto"
});

export default function ProductPage(props){
    // Matches width screen size of at most 1016px
    const matchMobile = useMediaQuery('(max-width:1016px)', {noSsr:true});

    // Url parameters
    const {productId} = useParams();

    // Specified product
    const product = products.filter(product => product.id == productId)[0];

    return (
        <Fragment>
            <AnnouncementBar />
            <Container>
                <Nav />
                <ProductContainer
                    sx={{
                        flexDirection: matchMobile ? "column" : "row",
                        width: matchMobile ? "90%" : "100%"
                    }}

                >
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
            </Container>
        </Fragment>
    )
}