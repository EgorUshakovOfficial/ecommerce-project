import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import {ContactForm, ShippingForm, Navigation} from '../../features/checkout';

export default function Information(){
    return (
        <CheckoutLayout>
            <ContactForm />
            <ShippingForm />
            <Navigation
                prevPage={{name:"Return to cart", href:"/checkout/cart"}}
                nextPage={{name:"Continue to shipping", href:"/checkout/shipping"}}
            />
        </CheckoutLayout>
    )
}