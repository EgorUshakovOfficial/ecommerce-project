import Table from '../containers/Table';
import CheckoutItem from './CheckoutItem';

// Replace with real data coming from the database or API
import {cartItems} from '../../../mock';

export default function CheckoutItems(props){
    return (
        <Table {...props}>
            {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} {...cartItem} />)}
        </Table>
    )
}