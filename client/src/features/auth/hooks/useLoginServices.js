import { useDispatch } from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';
import { fetchUser } from '../../../app/state/userSlice';

export default function useLoginServices(){
    // Dispatch API
    const dispatch = useDispatch();

    // Get Google credentials API
    const [getGoogleCredentials] = useGetGoogleCredentialsMutation();

    // Google authorization is successful
    const googleLoginOnSuccess = response => {
        // Authorization code
        const code = response.code;

        // Retrieve access token from the endpoint
        getGoogleCredentials({code})
        .then(response => response.data)
        .then(data => {
            // Access token
            let accessToken = data.accessToken;

            // Dispatch access token against store and retrieve user information
            dispatch(fetchUser.initiate(accessToken));
        })
        .catch(err => {
            // Check if access token is expired
            // Check if refresh token is valid
            // If it is, renew access token with refresh token
            console.log(err)
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

    return {
        googleLogin
    }
}