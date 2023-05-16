import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

// Products API
const productsApi = createApi({
    reducerPath: "productsApi",

    // Base url
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),

    // Product endpoints
    endpoints: builder => ({
        // Retrieve all products from the endpoint /products
        getProducts: builder.query({
            query: () => '/products'
        }),

        // Retrieves specific product from the endpoint /products/:productId
        getProduct: builder.query({
            query: name => `/products/${name}`
        })
    })
});

export const {useGetProductQuery, useGetProductsQuery} = productsApi;

export default productsApi;