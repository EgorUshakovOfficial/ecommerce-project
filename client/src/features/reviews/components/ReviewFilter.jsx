import {Box} from '@mui/material';
import ReviewStar from "./ReviewStar";

export default function ReviewFilter(){
    return (
        <Box
            display="grid"
            gap="0.4em"
        >
            <ReviewStar rating={5} numReviews={9} />
            <ReviewStar rating={4} numReviews={0} />
            <ReviewStar rating={3} numReviews={0} />
            <ReviewStar rating={2} numReviews={0} />
            <ReviewStar rating={1} numReviews={1} />
        </Box>
    )
}
