import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import {ConfirmationMessage} from '../features/checkout';

export default function Confirmation(){
    return (
        <ShoppingLayout>
            <ConfirmationMessage />
        </ShoppingLayout>
    );
}
