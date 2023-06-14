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
                url:"/shopping",
                method:"POST",
                body
            })
        }),

        // Retrieves shopping session from the API
        getShoppingSession: builder.mutation({
            query: body => ({
                url: "/shopping/data",
                method: "POST",
                body
            })
        }),

        // Updates shopping session fields
        updateShoppingSession: builder.mutation({
            query: body => ({
                url: "/shopping",
                method: "PUT",
                body
            })
        }),

        // Creates new cart in the database
        createCart: builder.mutation({
            query: body => ({
                url: "/shopping/cart",
                method: "POST",
                body
            })
        }),

        // Retrieve all cart items from the shopping session
        getCartItems: builder.query({
            query: () => ({url: '/shopping/cart'})
        }),

        // Adds new product to the cart
        addProductToCart: builder.mutation({
            query: body => ({
                url: "/shopping/cart/cart_items",
                method:"POST",
                body
            })
        }),

        // Updates cart item in the database
        updateCartItem: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/shopping/cart/cart_items/${id}`,
                method:"PUT",
                body
            })
        }),

        // Delete cart item in the database
        deleteCartItem: builder.mutation({
            query: body => ({
                url:`/shopping/cart/cart_items/${body.id}`,
                method: "DELETE",
                body
            })
        })
    })
});

export const {
    useCreateShoppingSessionMutation,
    useCreateCartMutation,
    useGetShoppingSessionMutation,
    useGetCartItemsQuery,
    useAddProductToCartMutation,
    useDeleteCartItemMutation,
    useUpdateCartItemMutation,
    useUpdateShoppingSessionMutation,
} = shoppingApi;

export default shoppingApi;