import {Box, Typography} from '@mui/material';

// Initialize rating box dimensions
const RATING_BOX_WIDTH = 72, RATING_BOX_HEIGHT = 72;

// Rating box component
const RatingBox = Styled(Box)({
    width:RATING_BOX_WIDTH,
    height:RATING_BOX_HEIGHT,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:"1.5em",
    color:"white",
    background:"#FAAD14"
});

export default function ReviewSummary(){
    return (
        <Box>
            <RatingBox>
                4.9
            </RatingBox>
            <Typography>Based on
                <Typography
                    variant="span"
                    fontWeight="600"
                >
                    10 reviews
                </Typography>
            </Typography>
        </Box>
    )
}