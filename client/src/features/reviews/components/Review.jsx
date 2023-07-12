import {Box, Rating, styled, Typography} from '@mui/material';
import {Image} from '../../../components';
import { REVIEW_CARD_WIDTH, REVIEW_CARD_HEIGHT } from '../../../utils/constants/review';
import ReviewCautionModal from './ReviewCautionModal';


// Card
const Card = styled(Box)({
    position:"relative",
    display:"grid",
    padding:"0.5em",
    border:"1px solid lightgray",
    borderRadius:"0.5em",
    gap:"0.25em",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
});

export default function Review({
    id,
    feedback,
    media_url,
    rating,
    user,
}){
    // Extract first and last names from the user object
    const {first_name, last_name} = user;

    // Initialize full name
    const fullName = `${first_name} ${last_name}`

    return (
        <Card overflow="hidden">
            <Image
                image={media_url}
                style={{
                    maxWidth:REVIEW_CARD_WIDTH,
                    height:REVIEW_CARD_HEIGHT,
                }}
            />
            <ReviewCautionModal id={id} />
            <Box
                display="grid"
                gap="0.25em"
            >
                <Typography
                    variant="h3"
                    fontSize="1.125em"
                    fontWeight="600"
                >
                    {fullName}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography>{feedback}</Typography>
            </Box>
        </Card>
    )
}