import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../app/state';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';
import { useCreateShoppingSessionMutation } from '../services/shoppingApi';

export default function Confirmation(){
    // User state
    const {user} = useSelector(state => state);

    // Dispatch API
    const dispatch = useDispatch();

    // Create shopping session mutation function
    const [createShoppingSession] = useCreateShoppingSessionMutation();

    useEffect(() => {
        // Clear cart from all items
        dispatch(clearCart())

        // Creates new shopping session in the database
        createShoppingSession({user:user.data.id, total: 0})
    }, [])

    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
