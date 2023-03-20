import {Fragment} from 'react';
import {Container} from '@mui/material'
import Annoucement from './components/AnnoucementBar';
import Header from './components/header/Header';

export default function App(){
    return(
        <Fragment>
            <Annoucement />
            <Container maxWidth="xl">
                <Header />
            </Container>
        </Fragment>
    );
}