import {useState} from 'react';
import {styled} from '@mui/material';
import Logo from '../../Logo';
import SearchBar from './SearchBar';
import {Box} from '@mui/material';
import CategoriesDropdown from './CategoriesDropdown';
import NavLink from './NavLink';
import ShoppingCart from '../../cart/ShoppingCart';

const StyledNav = styled('nav')(({theme}) => ({
    position: "relative",
    padding: theme.spacing(2, 2),
    display: "flex",
    alignItems:"center",
    justifyContent:"space-evenly"
}));

export default function Nav(){
    const [searchFocus, setSearchFocus] = useState(false);
    const handleFocus = () => setSearchFocus(true);
    return (
        <StyledNav>
            <Logo />
            <CategoriesDropdown />
            <NavLink name="Deals" icon={null} />
            <NavLink name="What's New" icon={null} />
            <NavLink name="Delivery" icon={null} />
            <SearchBar />
            <NavLink name="Sign in" icon={null} />
            <ShoppingCart />
        </StyledNav>
    )
}