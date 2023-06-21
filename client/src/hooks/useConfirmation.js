import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {clearCart} from '../app/state';
import api from '../services';

export default function useConfirmation(){
    // Dispatch API
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear cart of all items
        dispatch(clearCart())

        // Refetch products
        dispatch(api.products.endpoints.getProducts.initiate(undefined, {forceRefetch:true}));
    }, [])
}