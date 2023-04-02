import {useDispatch, useSelector} from 'react-redux';
import Table from '../containers/Table';
import CheckoutItem from './CheckoutItem';

// Replace with real data coming from the database or API
import {products} from '../../../mock';

export default function CheckoutItems(props){
    // Cart
    const cart = useSelector(state => state.cart);

    // Dispatch
    const dispatch = useDispatch();

    return (
        <Table {...props}>
            {cart.map(cartItem => <CheckoutItem key={cartItem.productId} {...cartItem} />)}
        </Table>
    )
}