import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import {PersonalForm} from '../../features/checkout';

export default function Information(){
    return (
        <CheckoutLayout>
            <PersonalForm />
        </CheckoutLayout>
    )
}