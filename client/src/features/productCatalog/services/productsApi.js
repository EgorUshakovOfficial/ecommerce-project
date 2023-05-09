import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../../utils/constants';

// Products API
const productsApi = createApi({
    // Base url
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),

    // Product endpoints
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products'
        }),
    })
});

export const {useGetProducts} = productsApi;
