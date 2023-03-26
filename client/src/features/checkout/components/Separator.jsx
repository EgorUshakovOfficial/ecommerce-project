import {Link} from 'react-router-dom';
import {Breadcrumbs} from '@mui/material';

export default function Separator(props){
    return (
        <Breadcrumbs separator=">" {...props}>
            <Link to="/cart">Cart</Link>,
            <Link to="/information" style={{color:"gray"}}>Information</Link>,
            <Link to="/shipping" style={{color:"gray"}}>Shipping</Link>,
            <Link to="/payment" style={{color:"gray"}}>Payment</Link>
        </Breadcrumbs>
    )
}