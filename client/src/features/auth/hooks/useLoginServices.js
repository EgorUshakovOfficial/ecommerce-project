import { useSelector, useDispatch} from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';
import {useCreateCartMutation, useCreateShoppingSessionMutation, useGetShoppingSessionMutation} from '../../../services/shoppingApi';
import { fetchCartItems } from '../../../app/state/cartSlice';
import { useGetUserMutation} from '../../../services/usersApi';
import calculateSubtotal from '../../../helper/calculateSubtotal'

export default function useLoginServices(){
    // Cart state
    const cart = useSelector(state => state.cart);

    // Dispatch API
    const dispatch = useDispatch();

    // Get Google credentials mutation function
    const [getGoogleCredentials] = useGetGoogleCredentialsMutation();

    // Create shopping session mutation function
    const [createShoppingSession] = useCreateShoppingSessionMutation();

    // Create cart mutation function
    const [createCart] = useCreateCartMutation();

    // Get user mutation function
    const [getUser] = useGetUserMutation();

    // Get shopping session mutation function
    const [getShoppingSession] = useGetShoppingSessionMutation();

    // Google authorization is successful
    const googleLoginOnSuccess = async response => {
        // Authorization code
        const code = response.code;

        // Retrieve access token from the endpoint
        getGoogleCredentials({code})
        .then(response => response.data)
        .then(({accessToken}) => {
            // Dispatch user information against the store
            getUser({accessToken})
            .then(response => response.data)
            .then(async ({status, user}) => {
                // Create shopping session and cart, if not empty, after user profile is registered
                if (status === 201){
                    // Initialize total
                    let subtotal = calculateSubtotal(cart);

                    // Creates shopping session in the database
                    createShoppingSession({user: user.id, total:subtotal})
                    .then(response => response.data)
                    .then(() => {
                        // Cart data
                        const cartData = cart.map(({id, productId, quantity}) => ({id, product:productId, quantity}));

                        // If cart has items in it, create and save them in the database
                        if (cart.length > 0){
                            createCart({cart:cartData})
                        }
                    })
                }
                // Otherwise, retrieve shopping session and cart items
                else{
                    // Gets shopping session from the API endpoint
                    getShoppingSession({user: user.id})
                    .then(response => response.data)
                    // Fetches cart items from the endpoint
                    .then(data => dispatch(fetchCartItems.initiate(undefined, {forceRefetch:true})))
                    .catch(err => {})
                }
            })
        })
    };

    // Google authorization failed
    const googleLoginOnFailure = () => {
        console.log('An error has occurred')
    };

    // Handles Google OAuth 2.0 authorization
    const googleLogin = useGoogleLogin({
        onSuccess: googleLoginOnSuccess,
        onError: googleLoginOnFailure,
        flow: 'auth-code'
    });

    return {googleLogin}
}