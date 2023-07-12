import {useContext} from 'react';
import {Box, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { REVIEW_MAIN_COLOR } from '../../../utils/constants/review';
import { ReviewContext } from '../context/ReviewProvider';

// Dimensions of the metric bar
const METRIC_WIDTH = 176, METRIC_HEIGHT = 6;

export default function ReviewStar({rating, handleRatingFilterOnClick}){
    // Reviews associated the product
    const reviews = useContext(ReviewContext);

    // Initialize number of reviews with the specified rating and total reviews
    const totalReviews = reviews.length;
    const numReviews = reviews.filter(review => review.rating === rating).length;

    // Width of the yellow metric bar
    const yellowBarWidth = (totalReviews > 0) ? (numReviews / totalReviews) : 0;

    return (
        <Box
            display="flex"
            alignItems="center"
            gap="0.25em"
            sx={{
                cursor:"pointer",
                "&:hover":{opacity:"0.7"}
            }}
            onClick={event => handleRatingFilterOnClick(event, rating)}
        >
            <Box
                display="flex"
                alignItems="center"
                gap="0.125em"
            >
                <Typography variant="span">{rating}</Typography>
                <StarIcon />
            </Box>
            <Box
                minWidth={METRIC_WIDTH}
                height={METRIC_HEIGHT}
            >
                <Box
                    height="100%"
                    width="100%"
                    sx={{background:"#EDEDED"}}
                >
                    <Box
                        width={yellowBarWidth}
                        height="100%"
                        sx={{background:REVIEW_MAIN_COLOR}}
                    />
                </Box>
            </Box>
            <Typography variant="p">{numReviews}</Typography>
        </Box>
    )
}