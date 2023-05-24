import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

// Authentication API
const authenticationApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials:"include"}),
    endpoints: builder => ({
        getGoogleCredentials: builder.mutation({
            query: body => ({
                url: 'auth/google/login',
                method: "POST",
                body
            })
        }),
        getAccessToken: builder.query({
            query: () => 'auth/google/refresh'
        })
    })
});

export const {useGetGoogleCredentialsMutation} = authenticationApi;

export default authenticationApi;