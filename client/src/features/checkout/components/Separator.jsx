import {useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {Breadcrumbs} from '@mui/material';

export default function Separator(props){
    // Section
    const {section} = useParams();

    // Checkout state
    const checkout = useSelector(state => state.checkout);

    // Personal and shipping states
    const {personal, shipping} = checkout;

    // Current section
    const getSectionColor = sectionName => (section === sectionName) ? "black" : "gray";

    return (
        <Breadcrumbs separator=">" {...props}>
            <Link to="/cart" style={{color:"gray"}}>Cart</Link>,
            <Link to="/checkout/information" style={{color: getSectionColor('information')}}>
                    Information
            </Link>,
            <Link
                to="/checkout/shipping"
                style={{
                    color: getSectionColor('shipping'),
                    pointerEvents: (personal.isFilled===false) ? "none" : ""
                }}
            >
                Shipping
            </Link>,
            <Link
                to="/checkout/payment"
                style={{
                    color: getSectionColor('payment'),
                    pointerEvents: (shipping.isFilled===false) ? "none" : ""
                }}
            >
                Payment
            </Link>
        </Breadcrumbs>
    )
}