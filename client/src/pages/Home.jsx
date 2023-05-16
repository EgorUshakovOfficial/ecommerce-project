import {Fragment} from 'react';
import {AnnouncementBar} from '../components';
import {Banner, Filters, ProductSection} from '../features/productCatalog';
import {Loading} from '../components';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import { useGetProductsQuery } from '../services/products';

export default function HomePage(){
    const {isLoading, error, data:products} = useGetProductsQuery();

    // Application is loading
    if (isLoading) return <Loading />;

    // Application experiences an error
    if (error) return <p>Error! Somethinh has gone wrong!</p>

    return (
        <Fragment>
            <AnnouncementBar />
            <ShoppingLayout>
                <Banner />
                <Filters />
                <ProductSection products={products} />
            </ShoppingLayout>
        </Fragment>
    )
}