import {Box, styled} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useLoginServices from '../hooks/useLoginServices';
import Connect from './Connect';

// Menu of login options
const LoginMenu = styled(Box)(({theme}) => ({
    display: "grid",
    rowGap:"0.5em"
}));

export default function LoginOptions(){
    const {googleLogin} = useLoginServices();

    return (
        <LoginMenu>
            {/* Google OAuth 2.0 Login Strategy */}
            <Connect
                strategyName="Google"
                icon={<GoogleIcon />}
                callback={googleLogin}
            />
        </LoginMenu>
    )
}