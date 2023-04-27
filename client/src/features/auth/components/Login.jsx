import {Fragment} from 'react';
import {Button, Modal} from '@mui/material';
import LoginForm from './LoginForm';
import useLogin from '../hooks/useLogin';


export default function Login(){
    const {
        handleOpenModalOnClick,
        handleOpenModalOnClose,
        openModal
    } = useLogin();

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
                aria-labelledBy=""
                aria-describedBy=""
            >
                <LoginForm
                    handleOpenModalOnClose={handleOpenModalOnClose}
                />
            </Modal>
        </Fragment>
    )
}