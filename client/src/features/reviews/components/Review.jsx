import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import ReviewFilter from './ReviewFilter';
import ReviewForm from './ReviewForm';
import ReviewSummary from './ReviewSummary';
import { REVIEW_MAIN_COLOR } from '../../../utils/constants/review';

export default function Review(){
    // Matches width screen size of at most 1016px
    const matchMobile = useMediaQuery('(max-width:1016px)', {noSsr:true});

    return (
        <Box
            padding={matchMobile ? "2em" : 0}
        >
            <Typography
                variant="h2"
                fontSize="1.5em"
                fontWeight="600"
                marginBottom="0.5em"
            >
                Customer Reviews
            </Typography>
            <Box
                display="flex"
                flexDirection={matchMobile ? "column" : "row"}
                gap="2em"
                sx={{position:"relative"}}
                marginBottom="1em"
            >
                <ReviewSummary />
                <ReviewFilter />
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                    size="large"
                    sx={{
                        "&:hover":{background:REVIEW_MAIN_COLOR},
                        background:REVIEW_MAIN_COLOR,
                        position:"absolute",
                        top:0,
                        left:"calc(100% - 160px)",
                        whiteSpace:"nowrap"
                    }}
                >
                    Write Review
                </Button>
            </Box>
            <ReviewForm />
        </Box>
    );
}