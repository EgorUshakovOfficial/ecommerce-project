import {Fragment} from 'react';
import { Box } from '@mui/material';
import {styled} from '@mui/material/styles';
import {Container, Section} from '../containers';
import {AnnouncementBar, Nav} from '../components';
import { ImageGallery, Content} from "../features/shopping";

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
    return (
        <Fragment>
            <AnnouncementBar />
            <Container>
                <Nav />
                <Section>
                    <ProductContainer>
                        <ImageGallery />
                        <Content
                            name={name}
                            description={description}
                            monthlyPrice={monthlyPrice}
                            yearlyPrice={yearlyPrice}
                            numReviews={numReviews}
                            avgRating={avgRating}
                        />
                    </ProductContainer>
                </Section>
            </Container>
        </Fragment>
    )
}