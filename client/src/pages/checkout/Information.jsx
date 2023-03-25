import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import {ContactForm, ShippingForm, Navigation} from '../../features/checkout';

export default function Information(){
    return (
        <CheckoutLayout>
            <ContactForm />
            <ShippingForm />
            <Navigation
                prevPage="Return to cart"
                nextPage="Continue to shipping"
            />
        </CheckoutLayout>
    )
}