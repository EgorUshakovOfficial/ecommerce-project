import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {clearCart} from '../app/state';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';

export default function Confirmation(){
    // Dispatch
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        // Clears cart
        dispatch(clearCart())
    }, [dispatch]);

    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
