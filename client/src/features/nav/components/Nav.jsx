import {Fragment} from 'react';
import {Box, styled, useMediaQuery} from '@mui/material';
import {Logo} from '../../../components';
import NavMobile from './NavMobile';
import NavCenter from './NavCenter';
import NavRight from './NavRight';


const StyledNav = styled('nav')(({theme}) => ({
    position: "relative",
    display: "flex",
    gridTemplateColumns:"repeat(5, max-content)",
    justifyContent:"space-between",
    padding: theme.spacing(2, 0),
}));

export default function Nav(){
    // Matches screen size of width of at most 1015px
    const matchMobile = useMediaQuery('(max-width: 1015px)', {noSsr:true});

    return (
        <StyledNav
            style={{
                width: matchMobile ? "calc(100% - 40px)" : "100%",
                marginInline: matchMobile ? "auto": "none"
            }}
        >
            {matchMobile ?
                <Fragment>
                    <NavMobile />
                    <Logo />
                </Fragment>
                :
                <Fragment>
                    <Logo />
                    <NavCenter />
                </Fragment>
            }
            <NavRight />
        </StyledNav>
    )
}