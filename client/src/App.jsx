import {Fragment} from 'react';
import {Container} from '@mui/material'
import Annoucement from './components/AnnoucementBar';
import Header from './components/header/Header';
import { ProductSection, Filters} from './features/gallery';

export default function App(){
    return(
        <Fragment>
            <Annoucement />
            <Container maxWidth="xl">
                <Header />
                <Filters />
                <ProductSection />
            </Container>
        </Fragment>
    );
}