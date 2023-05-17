import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';

// Authentication API
const authenticationApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: builder => ({
        getGoogleCredentials: builder.mutation({
            query: body => ({
                url: 'auth/refresh',
                method: "POST",
                body
            })
        })
    })
});

export const {useGetGoogleCredentialsMutation} = authenticationApi;

export default authenticationApi;