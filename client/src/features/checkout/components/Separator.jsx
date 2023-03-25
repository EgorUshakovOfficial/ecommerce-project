import {Link} from 'react-router-dom';
import {Breadcrumbs, Stack} from '@mui/material';

// Breadcrumb links
const links = [
    <Link to="/cart">Cart</Link>,
    <Link to="/information">Information</Link>,
    <Link to="/shipping">Shipping</Link>,
    <Link to="/payment">Payment</Link>
];

export default function Separator(){
    return (
        <Stack spacing={2}>
            {links.map(link => <Breadcrumbs>{link}</Breadcrumbs>)}
        </Stack>
    );
}