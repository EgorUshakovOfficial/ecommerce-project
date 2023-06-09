import {Fragment, useRef} from 'react';
import {Button, Modal} from '@mui/material';
import LoginForm from './LoginForm';
import useLogin from '../hooks/useLoginModal';


export default function Login(){
    const {
        handleOpenModalOnClick,
        handleOpenModalOnClose,
        openModal
    } = useLogin();

    const loginRef = useRef(null);

    return (
        <Fragment>
            <Button
                disableRipple
                color="inherit"
                sx={{
                    '&:hover':{backgroundColor:"transparent"},
                    background:"transparent",
                    fontSize:"1em",
                    fontWeight:"600",
                    textTransform:"none"
                }}
                onClick={handleOpenModalOnClick}
            >
                Log in
            </Button>
            <Modal
                open={openModal}
                onClose={handleOpenModalOnClose}
                aria-labelledby=""
                aria-describedby=""
            >
                <LoginForm
                    ref={loginRef}
                    handleOpenModalOnClose={handleOpenModalOnClose}
                />
            </Modal>
        </Fragment>
    )
}