import {Fragment} from 'react';
import {Container} from '@mui/material'
import Annoucement from './components/AnnoucementBar';
import Header from './components/header/Header';
import { ProductSection, Filters} from './features/gallery';
import { ProductCarousel } from './components';

export default function App(){
    return(
        <Fragment>
            <Annoucement />
            <Container maxWidth="xl">
                <Header />
                <Filters />
                <ProductSection />
                <ProductCarousel title="Similar Items You Might Like" id="similar-products-section" />
                <ProductCarousel title="Recentedly Viewed" id="recentedly-viewed-section" />
            </Container>
        </Fragment>
    );
}