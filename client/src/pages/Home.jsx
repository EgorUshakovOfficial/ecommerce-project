import {Fragment} from 'react';
import {Container} from '../containers';
import {AnnouncementBar, Header, ProductCarousel} from '../components';
import {Filters, ProductSection} from '../features/gallery';

export default function HomePage(){
    return (
        <Fragment>
            <AnnouncementBar />
            <Container>
                <Header />
                <Filters />
                <ProductSection />
                <ProductCarousel title="Similar Items You Might Like" id="similar-products-section" />
                <ProductCarousel title="Recentedly Viewed" id="recentedly-viewed-section" />
            </Container>
        </Fragment>
    )
}