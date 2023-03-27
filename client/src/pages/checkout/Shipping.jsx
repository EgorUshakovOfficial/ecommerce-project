import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import { InfoSummary, ShippingMethod, Navigation} from "../../features/checkout";

export default function Shipping(){
    return (
        <CheckoutLayout>
            <InfoSummary />
            <ShippingMethod />
            <Navigation
                prevPage={{name:"Return to information", href:"/checkout/information"}}
                nextPage={{name:"Continue to payment", href:"/checkout/payment"}}
            />
        </CheckoutLayout>
    )
}