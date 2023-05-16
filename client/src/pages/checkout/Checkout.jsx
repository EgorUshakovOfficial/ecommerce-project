import {useSelector} from 'react-redux';
import {useParams, Navigate} from 'react-router-dom';
import Information from './Information';
import Payment from './Payment';
import Shipping from './Shipping';
import { Loading } from '../../components';

// Sections in checkout
const sectionLookup = {
    information:Information,
    shipping: Shipping,
    payment: Payment
};

export default function Checkout(){
    // Section parameter
    const { section } = useParams();

    // Cart
    const {cart, order} = useSelector(state => state);

    // Payment is pending
    if (order.isLoading) return <Loading />

    // Cart is empty
    if (cart.length === 0) return <Navigate to="/" replace />

    // If section is not valid, redirect the user to the home page
    // Otherwise, direct the user to the specified section
    return (section in sectionLookup === false) ?
        <Navigate to="/" replace />
        : sectionLookup[section]()
}
