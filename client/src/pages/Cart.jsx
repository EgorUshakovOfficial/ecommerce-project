import { useSelector } from 'react-redux';
import {Fragment} from 'react';
import ShoppingLayout from '../containers/layouts/ShoppingLayout';
import { CartDetails, CartDetailsEmpty } from '../features/cart';
import { AnnouncementBar} from "../components";

export default function Cart(){
    // Cart state
    const cart = useSelector(state => state.cart);


    return (
        <Fragment>
            <AnnouncementBar />
            <ShoppingLayout>
                {(cart.length === 0) ?
                    <CartDetailsEmpty />
                    :
                    <CartDetails />
                }
            </ShoppingLayout>
        </Fragment>
    );
}