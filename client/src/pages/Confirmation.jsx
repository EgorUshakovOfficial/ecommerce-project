import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {clearCart} from '../features/shopping';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';
import { clearLoading } from '../app/state/loadingSlice';

export default function Confirmation(){
    // Dispatch
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        // Clears cart
        dispatch(clearCart())
    }, []);

    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
