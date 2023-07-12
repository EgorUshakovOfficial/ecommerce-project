import {useState} from 'react';

export default function useReviewModal(reviewId){
    // Opens review modal
    const [openReviewModal, setOpenReviewModal] = useState(false);

    // Opens review modal on click
    const openReviewModalOnClick = () => setOpenReviewModal(true);

    // Closes review modal on click
    const closeReviewModalOnClick = () => setOpenReviewModal(false);

    // Deletes review from the database
    const deleteReviewOnClick = () => console.log(reviewId);

    return {
        openReviewModal,
        closeReviewModalOnClick,
        deleteReviewOnClick,
        openReviewModalOnClick
    }
}