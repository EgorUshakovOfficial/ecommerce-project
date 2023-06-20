import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

// Checkout API
const ordersApi = createApi({
    reducerPath:"ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials:"include"}),
    endpoints: builder => ({
        addNewOrder: builder.mutation({
            // API endpoint: POST /api/orders
            query: checkout => ({
                url: '/orders',
                method: "POST",
                body: checkout
            })
        })
    })
});

export const {useAddNewOrderMutation} = ordersApi;

export default ordersApi;