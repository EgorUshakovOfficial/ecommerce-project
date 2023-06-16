import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CheckoutLayout from '../../containers/layouts/CheckoutLayout';
import { InfoSummary, ShippingMethod} from "../../features/checkout";

export default function Shipping(){
    // Personal Info state
    const personalInfo = useSelector(state => state.checkout.personal);

    // Personal form is not filled out
    if (personalInfo.isSubmitted == false){
        return <Navigate to='/checkout/information' replace={true} />
    }

    return (
        <CheckoutLayout>
            <InfoSummary />
            <ShippingMethod />
        </CheckoutLayout>
    )
}