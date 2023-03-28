import {styled, useMediaQuery} from '@mui/material';
import Logo from '../../Logo';
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
        <StyledNav>
            <Logo />
            <NavCenter />
            <NavRight />
        </StyledNav>
    )
}