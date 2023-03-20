import {Fragment} from 'react';
import Nav from './nav/Nav';
import Annoucement from './AnnoucementBar';
import Banner from './Banner';

export default function Header(){
    return(
        <Fragment>
            <Annoucement />
            <Nav />
            <Banner />
        </Fragment>
    )
}