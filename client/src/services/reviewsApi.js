import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../utils/constants';

// Reviews API
const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: builder => ({
        // Retrieve all reviews associated with the product
        getReviews: builder.query({
            query: productId => `/products/${productId}/reviews`
        }),

        // Creates new review in the database
        addReview: builder.mutation({
            query: body => ({
                url: `/products/${body.get('product')}/reviews`,
                method: "POST",
                body,
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data")
                },
            }),

            // Performs pessimistic cache update on reviews
            async onQueryStarted(args, {queryFulfilled, dispatch}){
                try{
                    const {data: newReview} = await queryFulfilled;

                    dispatch(
                        reviewsApi.util.updateQueryData('getReviews', args.get('product'), draft => {
                            return {reviews:[...draft.reviews, newReview]}
                        })
                    )
                } catch{

                }
            }
        }),
    })
});

export const {useAddReviewMutation, useGetReviewsQuery} = reviewsApi;

export default reviewsApi;
