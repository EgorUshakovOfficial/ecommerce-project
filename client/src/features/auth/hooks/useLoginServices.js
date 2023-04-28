import { useDispatch } from 'react-redux';
import {useGoogleLogin} from '@react-oauth/google';

export default function useLoginServices(){
    // Dispatch API
    const dispatch = useDispatch();

    // Google authorization is successful
    const googleLoginOnSuccess = response => {
        console.log(response)
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