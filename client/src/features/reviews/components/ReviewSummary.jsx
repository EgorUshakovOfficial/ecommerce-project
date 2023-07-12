import {useContext} from 'react';
import {Box, styled, Typography} from '@mui/material';
import { REVIEW_MAIN_COLOR } from '../../../utils/constants/review';
import { ReviewContext } from '../context/ReviewProvider';

// Initialize rating box dimensions
const RATING_BOX_WIDTH = 72, RATING_BOX_HEIGHT = 72;

// Rating box component
const RatingBox = styled(Box)({
    width:RATING_BOX_WIDTH,
    height:RATING_BOX_HEIGHT,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:"1.5em",
    fontWeight:600,
    marginBottom:"0.25em",
    color:"white",
    background:REVIEW_MAIN_COLOR,
    borderRadius:"0.25em"
});

export default function ReviewSummary(){
    // Reviews
    const reviews = useContext(ReviewContext);

    // Initialize number of reviews
    const numReviews = reviews.length;

    // Computes the average of all reviews associated with the product
    const avgRating = reviews
    .reduce((avgRating, {rating}) => avgRating + (rating/numReviews), 0);

    return (
        <Box>
            <RatingBox>
                {avgRating}
            </RatingBox>
            <Typography>Based on
                <Typography
                    variant="span"
                    fontWeight="600"
                    marginLeft="0.25em "
                >
                    {numReviews} reviews
                </Typography>
            </Typography>
        </Box>
    )
}