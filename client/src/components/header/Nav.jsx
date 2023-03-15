import {styled} from '@mui/material';
import Logo from '../Logo';
import SearchBar from './SearchBar';
import {Box} from '@mui/material';
import CategoriesDropdown from './CategoriesDropdown';
import NavLink from './NavLink';
import ShoppingCart from '../cart/ShoppingCart';

const StyledNav = styled('nav')(({theme}) => ({
    padding: theme.spacing(2, 4),
    display: "flex",
    alignItems:"center",
}));

export default function Nav(){
    return (
        <StyledNav>
            <Logo />
            <CategoriesDropdown />
            <Box>
                <NavLink name="Deals" icon={null} />
                <NavLink name="What's New" icon={null} />
                <NavLink name="Delivery" icon={null} />
            </Box>
            <SearchBar />
            <NavLink name="Sign in" icon={null} />
            <ShoppingCart />
        </StyledNav>
    )
}