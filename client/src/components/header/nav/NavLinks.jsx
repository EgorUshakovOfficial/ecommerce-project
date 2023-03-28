import {useContext} from 'react';
import {Box} from '@mui/material';
import { SearchContext } from '../../../context/SearchProvider';

import NavLink from './NavLink';

export default function NavLinks(){
    const {hide} = useContext(SearchContext);

    return (
        <Box
            display={hide ? "none" : "flex"}
            gap="0.5em"
        >
            <NavLink name="Deals" icon={null} />
            <NavLink name="What's New" icon={null} />
            <NavLink name="Delivery" icon={null} />
        </Box>
    )
}