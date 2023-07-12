import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {Box, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Container} from '../containers';
import {AnnouncementBar, Loading} from '../components';
import {Nav} from '../features/nav';
import { ReviewProvider, ReviewSection } from '../features/reviews';
import { ImageGallery, Content} from "../features/shopping";
import { useGetProductQuery } from '../services/products';
import { useGetReviewsQuery } from '../services/reviewsApi';

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

    // Extract specified product Id number from the path name
    const {productId} = useParams();

    // Sends GET /api/products/:productId
    // Retrieves specified product from the API endpoint
    const product = useGetProductQuery(productId);

    // Sends GET /api/products/:productId/reviews
    // Retrieves all reviews associated with the product from the API
    const reviewsResponse = useGetReviewsQuery(productId);

    // Application is loading
    if (product.isLoading || reviewsResponse.isLoading) return <Loading />

    // Application experiences an error
    if (product.error) return <div>Error! Something has gone wrong!</div>

    // Extract reviews from the reviews API's response
    const reviews = reviewsResponse.data.reviews;

    // Product images
    const productImages = product.data.product_images;

    // Main image
    const mainImage = productImages.filter(image => image.main_image)[0];

    // Other images
    const otherImages = productImages.filter(image => image.main_image === false);

    // Colors
    const colors = productImages.map( ({color_name:colorName, hexacode}) => ({colorName, hexacode}));

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
                        mainImage={mainImage.image_url}
                        otherImages={otherImages}
                        colors={colors}
                    />
                    <Content
                        product={product.data}
                        reviews={reviews}
                    />
                </ProductContainer>
                <ReviewProvider reviews={reviews}>
                    <ReviewSection />
                </ReviewProvider>
            </Container>
        </Fragment>
    )
}