import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../utils/constants";

// Users API
const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials:"include",
    }),

    endpoints: builder => ({
        // Retrieves user information from the Google API
        getUser: builder.mutation({
            query: ({accessToken}) => ({
                url: '/users/google/me',
                method:"POST",
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            }),
            transformResponse: (userData, meta) => ({user:{...userData}, status:meta.response.status})
        }),

        // Logs user out
        logoutUser: builder.mutation({query: () => 'auth/logout'})
    })
});

export const {useGetUserMutation, useLogoutUserMutation} = usersApi;

export const {getUser} = usersApi;

export default usersApi;