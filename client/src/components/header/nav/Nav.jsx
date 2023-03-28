import {Box, styled } from '@mui/material';
import { SearchProvider } from '../../../context/SearchProvider';
import CategoriesDropdown from './CategoriesDropdown';
import Logo from '../../Logo';
import NavLink from './NavLink';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import ShoppingCart from '../../cart/ShoppingCart';


const StyledNav = styled('nav')(({theme}) => ({
    position: "relative",
    display: "flex",
    gridTemplateColumns:"repeat(5, max-content)",
    justifyContent:"space-between",
    padding: theme.spacing(2, 0),

}));

// Search Wrapper
const Wrapper = styled('div')({
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",
    gap:"0.5em"
})

export default function Nav(){
    return (
        <StyledNav>
            <Logo />
            <SearchProvider>
                <Wrapper>
                    <CategoriesDropdown />
                    <NavLinks />
                    <SearchBar />
                </Wrapper>
            </SearchProvider>
            <Wrapper>
                <NavLink name="Sign in" icon={null} />
                <ShoppingCart  />
            </Wrapper>
        </StyledNav>
    )
}