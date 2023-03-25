import Table from '../containers/Table';
import CheckoutItem from './CheckoutItem';

// Replace with real data coming from the database or API
import {cartItems} from '../../../mock';

export default function CheckoutItems(){
    return (
        <Table>
            {cartItems.map(cartItem => <CheckoutItem {...cartItem} />)}
        </Table>
    )
}