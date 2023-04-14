import { BASE_URL } from '../../../utils/constants';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Checkout API
const checkoutApi = createApi({
    // Base url is domain name/api
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),

    endpoints: builder => ({
        addNewOrder: builder.mutation({
            // Checkout is payload attached to the body of the /api/orders POST request
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