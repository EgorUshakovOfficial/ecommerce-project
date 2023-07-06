import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../utils/constants';

// Reviews API
const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: builder => ({
        // Creates new review in the database
        addReview: builder.mutation({
            query: body => ({
                url: `/products/${body.get('product')}/reviews`,
                method: "POST",
                body,
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data")
                }
            })
        })
    })
});

export const {useAddReviewMutation} = reviewsApi;

export default reviewsApi;
