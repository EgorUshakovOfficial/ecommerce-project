import {Fragment} from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CheckoutLayout from "../../containers/layouts/CheckoutLayout";
import { Loading } from "../../components";
import {PaymentForm} from '../../features/checkout';
import { useAddNewOrderMutation } from "../../services/orders";

export default function Payment(){
    // Personal and shipping states
    const {personal, shipping} = useSelector(state => state.checkout);

    // Add order mutation function
    const [addNewOrder, {data, error:orderError, isLoading}] = useAddNewOrderMutation();

    // Redirects user to /checkout/information if personal information form is not submitted
    if (personal.isSubmitted === false){
        return <Navigate to="/checkout/information" replace={true} />
    }

    // Redirects user to /checkout/shipping if shipping method form is not submitted
    if (shipping.isSubmitted === false){
        return <Navigate to="/checkout/shipping" replace={true} />
    }

    return (
        <Fragment>
            {isLoading ? (<Loading />)
                : data ?
                (<Navigate to="/success" replace={true} />)
                :
                (<CheckoutLayout>
                    <PaymentForm
                        addNewOrder={addNewOrder}
                        orderError={orderError}
                    />
                </CheckoutLayout>)
            }
        </Fragment>
    );
}