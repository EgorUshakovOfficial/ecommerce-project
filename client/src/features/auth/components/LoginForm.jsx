import {Box, IconButton, styled} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginHeader from './LoginHeader';
import LoginOptions from './LoginOptions';

const StyledForm = styled(Box)( ({theme}) => ({
    position:"absolute",
    background:"white",
    top:"50%",
    left:"50%",
    width:"350px",
    transform:"translate(-50%, -50%)",
    borderRadius:"0.5em",
    border:"1px solid lightgray",
    padding:"1em"
}));

export default function LoginForm({handleOpenModalOnClose}){
    return (
        <StyledForm>
            <IconButton
                disableRipple
                onClick={handleOpenModalOnClose}
                style={{
                    position:"absolute",
                    top:"2%",
                    left:"88%",

                }}
            >
                <CloseIcon size="" />
            </IconButton>
           <LoginHeader />
           <LoginOptions />
        </StyledForm>
    )
}