import { useSelector } from 'react-redux';
import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import ReviewFilter from './ReviewFilter';
import ReviewForm from './ReviewForm';
import ReviewSummary from './ReviewSummary';
import Reviews from './Reviews';
import ReviewCautionModal from './ReviewCautionModal';
import { REVIEW_MAIN_COLOR } from '../../../utils/constants/review';
import useReviewSection from '../hooks/useReviewSection';


export default function ReviewSection(){
    // User
    const user = useSelector(state => state.user.data);

    // Matches width screen size of at most 1016px
    const matchMobile = useMediaQuery('(max-width:1016px)', {noSsr:true});

    const {
        isReviewFormVisible,
        ratingFilter,
        closeReviewFormOnClick,
        handleRatingFilterOnClick,
        handleReviewFormOnClick,
    } = useReviewSection();

    return (
        <Box padding={matchMobile ? "2em" : 0}>
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
                <ReviewFilter handleRatingFilterOnClick={handleRatingFilterOnClick} />
                {(user !== null) && <Button
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
                    onClick={handleReviewFormOnClick}
                >
                    Write Review
                </Button>}
            </Box>
            <ReviewCautionModal />
            <Reviews ratingFilter={ratingFilter} />
            {isReviewFormVisible && <ReviewForm closeReviewFormOnClick={closeReviewFormOnClick} />}
        </Box>
    );
}