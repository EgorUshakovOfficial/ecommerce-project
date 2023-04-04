import CheckoutLayout from "../../containers/layouts/CheckoutLayout";
import {PaymentForm} from '../../features/checkout';

export default function Payment(){
    return (
        <CheckoutLayout>
            <PaymentForm />
        </CheckoutLayout>
    );
}