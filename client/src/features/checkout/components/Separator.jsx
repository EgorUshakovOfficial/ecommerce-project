import {useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {Breadcrumbs} from '@mui/material';
import checkLinkDisableStatus from '../utils/checkLinkDisableStatus';

export default function Separator(props){
    // Section
    const {section} = useParams();

    // Checkout state
    const checkout = useSelector(state => state.checkout);

    // Checks if shipping link is disabled
    let isShippingLinkDisabled = checkLinkDisableStatus(checkout.personal);

    // Checks if payment link is disabled
    let isPaymentLinkDisabled = checkLinkDisableStatus(checkout.shipping);

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
                    pointerEvents: isShippingLinkDisabled ? "none" : ""
                }}
            >
                Shipping
            </Link>,
            <Link
                to="/checkout/payment"
                style={{
                    color: getSectionColor('payment'),
                    pointerEvents: isPaymentLinkDisabled ? "none" : ""
                }}
            >
                Payment
            </Link>
        </Breadcrumbs>
    )
}