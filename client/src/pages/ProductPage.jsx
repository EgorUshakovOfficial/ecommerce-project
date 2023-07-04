import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Box, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Container} from '../containers';
import {AnnouncementBar, Loading} from '../components';
import {Nav} from '../features/nav';
import { Review } from '../features/reviews';
import { ImageGallery, Content} from "../features/shopping";
import { useGetProductQuery } from '../services/products';

const ProductContainer = styled(Box)({
    display:"flex",
    gap:"0.5em",
    justifyContent:"space-evenly",
    paddingBlock:"2em",
    marginInline:"auto"
});

export default function ProductPage(props){
    // User state
    const user = useSelector(state => state.user.data);

    // Matches width screen size of at most 1016px
    const matchMobile = useMediaQuery('(max-width:1016px)', {noSsr:true});

    // Url parameters
    const {productId} = useParams();

    const {error, isLoading, data:product} = useGetProductQuery(productId);

    // Application is loading
    if (isLoading) return <Loading />

    // Application experiences an error
    if (error) return <div>Error! Something has gone wrong!</div>

    // Product images
    const productImages = product.product_images;

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
                    <Content product={product} />
                </ProductContainer>
                {user !== null && <Review />}
            </Container>
        </Fragment>
    )
}