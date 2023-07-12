import {Box} from '@mui/material';
import ReviewStar from "./ReviewStar";

// Ratings
const ratings = [5, 4, 3, 2, 1];

export default function ReviewFilter({handleRatingFilterOnClick}){
    return (
        <Box
            display="grid"
            gap="0.4em"
        >
            {ratings.map(rating => (
                <ReviewStar
                    key={`review-filter-${rating}`}
                    rating={rating}
                    handleRatingFilterOnClick={handleRatingFilterOnClick}
                />
            ))}
        </Box>
    )
}
