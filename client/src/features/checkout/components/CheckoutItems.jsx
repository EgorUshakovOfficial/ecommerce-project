import {useSelector} from 'react-redux';
import Table from '../containers/Table';
import CheckoutItem from './CheckoutItem';



export default function CheckoutItems(props){
    // Cart
    const cart = useSelector(state => state.cart);

    return (
        <Table {...props}>
            {cart.map(cartItem => <CheckoutItem key={cartItem.id} {...cartItem} />)}
        </Table>
    )
}