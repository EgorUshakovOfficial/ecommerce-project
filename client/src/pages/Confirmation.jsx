import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';
import { useConfirmation } from '../hooks';

export default function Confirmation(){
    useConfirmation();

    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
