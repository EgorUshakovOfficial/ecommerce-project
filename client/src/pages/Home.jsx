import {Fragment} from 'react';
import {AnnouncementBar} from '../components';
import {Banner, Filters, ProductCarousel, ProductSection} from '../features/productCatalog';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';

export default function HomePage(){
    return (
        <Fragment>
            <AnnouncementBar />
            <ShoppingLayout>
                <Banner />
                <Filters />
                <ProductSection />
                <ProductCarousel
                    title="Similar Items You Might Like"
                    id="similar-products-section"
                    style={{paddingBottom:"2em"}}
                />
                <ProductCarousel title="Recentedly Viewed" id="recentedly-viewed-section" />
            </ShoppingLayout>
        </Fragment>
    )
}