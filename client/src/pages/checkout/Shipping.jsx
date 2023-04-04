import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import { InfoSummary, ShippingMethod, Navigation} from "../../features/checkout";

export default function Shipping(){
    return (
        <CheckoutLayout>
            <InfoSummary />
            <ShippingMethod />
        </CheckoutLayout>
    )
}