import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

// Shopping API
const shoppingApi = createApi({
    reducerPath: "shoppingApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials:"include"}),
    endpoints: builder => ({
        // Creates new shopping session for new user
        createShoppingSession: builder.mutation({
            query: body => ({
                url:"/shopping_session",
                method:"POST",
                body
            })
        }),

        // Retrieve shopping sessions from the API
        getShoppingSession: builder.mutation({
            query: body => ({
                url: `/shopping_session/data`,
                method: "POST",
                body
            })
        }),

        // Updates shopping session fields
        updateShoppingSession: builder.mutation({
            query: body => ({
                url: "/shopping_session",
                method: "PUT",
                body
            })
        })
    })
});

export const {
    useCreateShoppingSessionMutation,
    useUpdateShoppingSessionMutation,
    useGetShoppingSessionMutation
} = shoppingApi;

export default shoppingApi;