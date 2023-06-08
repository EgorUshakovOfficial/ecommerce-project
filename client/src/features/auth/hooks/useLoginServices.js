import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';
import { useCreateShoppingSessionMutation, useGetShoppingSessionMutation} from '../../../services/shoppingApi';
import { useGetUserMutation} from '../../../services/usersApi';

export default function useLoginServices(){
    // Get Google credentials mutation function
    const [getGoogleCredentials] = useGetGoogleCredentialsMutation();

    // Create shopping session mutation function
    const [createShoppingSession] = useCreateShoppingSessionMutation();

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
                // If user profile is created, create a shopping session for it
                if (status === 201){
                    createShoppingSession({user: user.id})
                }
                // Otherwise, get existing shopping session from the database
                else{
                    getShoppingSession({user: user.id})
                }
            })
        })
        // getGoogleCredentials({code})
        // .then(response => response.data)
        // .then(async ({accessToken}) => {
        //     // Dispatch user information mutation against the store
        //     getUser({accessToken})
        //     .then(response => response.data)
        //     .then( ({response, user}) =>  {
        //         // If user profile is created, create a shopping session for it
        //         if (response.status === 201){
        //             createShoppingSession({user});
        //         }
        //     })
        // })
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