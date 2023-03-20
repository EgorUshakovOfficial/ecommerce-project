import {Fragment} from 'react';
import Nav from './nav/Nav';
import Banner from './Banner';

export default function Header(){
    return(
        <Fragment>
            <Banner />
            <Nav />
        </Fragment>
    )
}