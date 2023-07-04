import {useEffect, useState} from 'react';

export default function useReview(){
    // Is review form visible?
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    // Toggles review form on click
    const handleReviewFormOnClick = () => setIsReviewFormVisible(prevState => !prevState);

    // Close review form on click
    const closeReviewFormOnClick = () => setIsReviewFormVisible(false);

    // Scrolls window to the bottom
    useEffect(() => {
        if (isReviewFormVisible){
            window.scrollTo({
                top:document.body.scrollHeight,
                behavior:'smooth'
            });
        }
    }, [isReviewFormVisible])

    return {
        closeReviewFormOnClick,
        handleReviewFormOnClick,
        isReviewFormVisible
    }
}