import {useDispatch } from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';
import { fetchUser } from '../../../app/state';

export default function useLoginServices(){
    // Dispatch API
    const dispatch = useDispatch();

    // Get Google credentials API
    const [getGoogleCredentials] = useGetGoogleCredentialsMutation();

    // Google authorization is successful
    const googleLoginOnSuccess = async response => {
        // Authorization code
        const code = response.code;

        // Retrieve access token from the endpoint
        getGoogleCredentials({code})
        .then(response => response.data)
        .then(({accessToken}) => {
            // Dispatch user information action against the store
            dispatch(fetchUser.initiate(accessToken));
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