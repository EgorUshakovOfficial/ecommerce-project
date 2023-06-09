import { useSelector } from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';
import { useCreateCartMutation, useCreateShoppingSessionMutation, useGetShoppingSessionMutation} from '../../../services/shoppingApi';
import { useGetUserMutation} from '../../../services/usersApi';

export default function useLoginServices(){
    // Cart state
    let cart = useSelector(state => state.cart);
    cart = cart.map(({id:productId, quantity}) => ({quantity, product:productId}));

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
                // Create shopping session and cart after user profile is registered
                if (status === 201){
                    createShoppingSession({user: user.id})
                    .then(response => response.data)
                    .then(data => createCart({cart}))
                }
                // Otherwise, get existing shopping session from the database
                else{
                    getShoppingSession({user: user.id})
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