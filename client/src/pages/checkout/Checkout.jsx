import {useParams, Navigate} from 'react-router-dom';
import Information from './Information';
import Payment from './Payment';
import Shipping from './Shipping';

// Sections in checkout
const sectionLookup = {
    information:Information,
    shipping: Shipping,
    payment: Payment
};

export default function Checkout(){
    // Section parameter
    const { section } = useParams();

    // If section is not valid, redirect the user to the home page
    // Otherwise, direct the user to the specified section
    return (section in sectionLookup === false) ?
        <Navigate to="/" replace />
        : sectionLookup[section]()
}
