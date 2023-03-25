import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import { InfoSummary, ShippingMethod, Navigation} from "../../features/checkout";

export default function Shipping(){
    return (
        <CheckoutLayout>
            <InfoSummary />
            <ShippingMethod />
            <Navigation
                prevPage="Return to information"
                nextPage="Continue to payment"
            />
        </CheckoutLayout>
    )
}