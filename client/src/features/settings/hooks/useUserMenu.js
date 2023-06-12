import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useMediaQuery } from '@mui/material';
import getInitials from '../utils/getInitials';
import { clearCart } from '../../../app/state/cartSlice';
import { NAV_MAX_MOBILE } from '../../../utils/constants/styles';
import { useLogoutUserMutation } from '../../../services/usersApi';

export default function useUserMenu(){
    // User state
    const user = useSelector(state => state.user.data);

    // Dispatch API
    const dispatch = useDispatch();

    // Logout mutation function
    const [logoutUser] = useLogoutUserMutation();

    // First and last name of user
    const {firstName, lastName} = user;

    // Full name
    const fullName = `${firstName} ${lastName}`;

    // Initials of first and last name
    const initials = getInitials(firstName, lastName);

    // Anchor element
    const [anchorElement, setAnchorElement] = useState(null);

    // Determines if user menu is open or closed
    const openUserMenu = (anchorElement !== null);

    // Match mobile
    const matchMobile = useMediaQuery(`(max-width: ${NAV_MAX_MOBILE}px)`, {noSsr:true});

    // Opens user menu when clicked
    const handleUserMenuOnClick = event => setAnchorElement(event.currentTarget);

    // Closes user menu when clicked
    const handleUserMenuOnClose = () => setAnchorElement(null);

    // Logs out user on click
    const handleLogout = () => {
        // Removes refresh and shopping session cookies
        logoutUser();

        // Dispatch clear cart action against the store
        dispatch(clearCart());
    }

    return {
        anchorElement,
        firstName,
        openUserMenu,
        initials,
        matchMobile,
        handleLogout,
        handleUserMenuOnClick,
        handleUserMenuOnClose
    }
}