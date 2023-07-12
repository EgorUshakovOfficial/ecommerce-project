import {useEffect, useState} from 'react';

export default function useReviewSection(){
    // Is review form visible?
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    // Rating filter
    const [ratingFilter, setRatingFilter] = useState(-1);

    // Handles rating filter on click
    const handleRatingFilterOnClick = (event, value) => setRatingFilter(value);

    // Toggles review form on click
    const handleReviewFormOnClick = () => setIsReviewFormVisible(prevState => !prevState);

    // Close review form on click
    const closeReviewFormOnClick = () => setIsReviewFormVisible('');

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
        isReviewFormVisible,
        ratingFilter,
        closeReviewFormOnClick,
        handleRatingFilterOnClick,
        handleReviewFormOnClick,
    }
}