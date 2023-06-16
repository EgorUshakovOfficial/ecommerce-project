import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CheckoutLayout from "../../containers/layouts/CheckoutLayout";
import {PaymentForm} from '../../features/checkout';

export default function Payment(){
    // Shipping state
    const {personal, shipping} = useSelector(state => state.checkout);

    // Redirects user to /checkout/information if personal information form is not submitted
    if (personal.isSubmitted === false){
        return <Navigate to="/checkout/information" replace={true} />
    }

    // Redirects user to /checkout/shipping if shipping method form is not submitted
    if (shipping.isSubmitted === false){
        return <Navigate to="/checkout/shipping" replace={true} />
    }

    return (
        <CheckoutLayout>
            <PaymentForm />
        </CheckoutLayout>
    );
}