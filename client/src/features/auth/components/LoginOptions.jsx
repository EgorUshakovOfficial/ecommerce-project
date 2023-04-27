import {Box, styled} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Connect from './Connect';

// Menu of login options
const LoginMenu = styled(Box)(({theme}) => ({
    display: "grid",
    rowGap:"0.5em"
}));

export default function LoginOptions(){
    return (
        <LoginMenu>
            <Connect strategyName="Google" icon={<GoogleIcon />} />
        </LoginMenu>
    )
}