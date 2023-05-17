import { useDispatch } from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';
import { useGetGoogleCredentialsMutation } from '../../../services/authenticationApi';

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
        .then(data => console.log(data));
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