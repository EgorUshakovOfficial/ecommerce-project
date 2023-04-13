import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {clearCart} from '../features/shopping';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';

export default function Confirmation(){
    // Dispatch
    const dispatch = useDispatch();

    // Clears cart before confirmation message is rendered
    useLayoutEffect(() => {
        dispatch(clearCart())
    }, []);

    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
