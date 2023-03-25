import CheckoutLayout from "../../containers/layouts/CheckoutLayout";
import {Navigation, PaymentForm} from '../../features/checkout';

export default function Payment(){
    return (
        <CheckoutLayout>
            <PaymentForm />
            <Navigation
                prevPage="Return to shipping"
                nextPage="Pay now"
            />
        </CheckoutLayout>
    );
}