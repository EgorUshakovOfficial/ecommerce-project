import {Box, Typography, Rating} from '@mui/material';

export default function Ratings({numReviews, avgRating}){
    return (
        <Box
            display="flex"
            alignItems="center"
            gap="0.5em"
        >
            <Rating name="product-review" value={4} readOnly />
            <Typography variant="caption">({numReviews})</Typography>
        </Box>
    )
}