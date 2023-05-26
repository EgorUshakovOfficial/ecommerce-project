import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../utils/constants";

// Users API
const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials:"include"}),
    endpoints: builder => ({
        // Retrieves user information from the Google API
        getUser: builder.query({
            query: accessToken => ({
                url: '/users/google/me',
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            }),
        }),
        // Logs user out
        logoutUser: builder.query({
            query: () => 'auth/logout'
        })
    })
});

export const {useGetUserQuery} = usersApi;

export const {getUser} = usersApi


export default usersApi;