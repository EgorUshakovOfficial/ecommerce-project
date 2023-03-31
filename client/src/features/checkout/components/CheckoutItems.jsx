import Table from '../containers/Table';
import CheckoutItem from './CheckoutItem';

// Replace with real data coming from the database or API
import {products} from '../../../mock';

export default function CheckoutItems(props){
    return (
        <Table {...props}>
            {products.map(cartItem => <CheckoutItem key={cartItem.id} {...cartItem} />)}
        </Table>
    )
}