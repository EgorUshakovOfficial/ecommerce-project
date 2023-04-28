import {useState} from 'react';

export default function useLoginModal(){
    const [openModal, setOpenModal] = useState(false);

    // Handles the state of login modal when it's clicked
    const handleOpenModalOnClick = () => setOpenModal(true);

    // Handles the state of login modal when it's closed
    const handleOpenModalOnClose = () => setOpenModal(false);

    return {
        handleOpenModalOnClick,
        handleOpenModalOnClose,
        openModal
    }
}