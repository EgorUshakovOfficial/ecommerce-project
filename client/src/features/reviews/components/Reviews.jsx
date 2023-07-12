import { useContext } from 'react';
import {Box, styled} from '@mui/material';
import Review from "./Review";
import { REVIEW_CARD_WIDTH } from '../../../utils/constants/review';
import { ReviewContext } from '../context/ReviewProvider';


// Review Cards' Container
const Container = styled(Box)({
    display:"grid",
    marginBottom:"1em",
    gap:"0.5em",
    justifyContent:"center"
});

export default function Reviews({ratingFilter, openReviewModalOnClick}){
    const reviews = useContext(ReviewContext);
    return (
        <Container
            gridTemplateColumns={`repeat(auto-fit, minmax(${REVIEW_CARD_WIDTH}px, max-content))`}
        >
            {reviews
                .filter(review => {
                    // No filter is applied to the reviews
                    if (ratingFilter === -1) return true;

                    // Apply filter to the reviews
                    return review.rating === ratingFilter
                })
                .map(review => {
                    return <Review key={review.id} {...review} openReviewModalOnClick={openReviewModalOnClick}  />
                })
            }
        </Container>
    );
}