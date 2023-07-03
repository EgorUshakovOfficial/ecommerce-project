import {Box, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { REVIEW_MAIN_COLOR } from '../../../utils/constants/review';

// Dimensions of the metric bar
const METRIC_WIDTH = 176, METRIC_HEIGHT = 6;

export default function ReviewStar({rating, numReviews}){
    // Total number of reviews
    const totalReviews = 10;

    // Width of the yellow metric bar
    const yellowBarWidth = numReviews / totalReviews;

    return (
        <Box
            display="flex"
            alignItems="center"
            gap="0.25em"
            sx={{
                cursor:"pointer",
                "&:hover":{opacity:"0.7"}
            }}
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