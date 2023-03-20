import {Fragment} from 'react';
import Nav from './nav/Nav';
import Annoucement from './AnnoucementBar';

export default function Header(){
    return(
        <Fragment>
            <Annoucement />
            <Nav />
        </Fragment>
    )
}