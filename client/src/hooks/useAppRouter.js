import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useIsMount from './useIsMount';
import { useUpdateShoppingSessionMutation } from '../services/shoppingApi';
import { calculateSubtotal, calculateTotal} from '../helper';

export default function useAppRouter(){
    // User state
    const {user, cart, checkout:{shipping}} = useSelector(state => state);

    // Checks if the user is authenticated
    const isAuthenticated = (user !== null);

    // Update shopping session mutation function
    const [updateShoppingSession] = useUpdateShoppingSessionMutation();

    // Checks if component initially renders
    const isMounted = useIsMount();

    // Calculates total amount owed by the customer
    let subtotal = calculateSubtotal(cart);

    let shippingCost = shipping.price;

    let total = calculateTotal(subtotal, shippingCost);

    // Updates shopping session in the database whenever cart or shipping cost is changed
    useEffect(() => {
        // Skips initial render
        if (isMounted){
            updateShoppingSession({user:user.data.id, total})
        }
    }, [JSON.stringify(cart), JSON.stringify(shipping)])


    return {isAuthenticated}
}