import { BASE_URL } from '../../../utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Checkout API
const checkoutApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: builder => ({
        addNewOrder: builder.mutation({
            query: checkout => ({
                url: '/orders',
                method: "POST",
                body: checkout
            })
        })
    })
});

export const {useAddNewOrderMutation} = checkoutApi;

export default checkoutApi;