import CheckoutLayout from "../../containers/layouts/CheckoutLayout";
import {Navigation, PaymentForm} from '../../features/checkout';

export default function Payment(){
    return (
        <CheckoutLayout>
            <PaymentForm />
            <Navigation
                prevPage={{name:"Return to shipping", href:"/checkout/information"}}
                nextPage={{name:"Pay now", href:"#"}}
            />
        </CheckoutLayout>
    );
}