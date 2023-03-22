import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Ratings } from '../../../components';
import Colors from './Colors';
import Controls from './Controls';

// Content container
const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    gap:"2em"
});

export default function Content({
    name,
    description,
    yearlyPrice,
    monthlyPrice,
    numReviews,
    avgRating
}){
    return (
        <ContentContainer>
            <Box>
                <Typography
                    variant="h3"
                    fontWeight="600"
                    gutterBottom
                >
                    {name}
                </Typography>
                <Typography
                    variant="body1"
                    color="gray"
                    gutterBottom
                >
                    {description}
                </Typography>
                <Ratings numReviews={numReviews} avgRating={avgRating} />
            </Box>
            <Box
                pt="2em"
                pb="2em"
                borderTop="1px solid lightgray"
                borderBottom="1px solid lightgray"
             >
                <Typography
                    variant="h4"
                    fontWeight="600"
                    gutterBottom
                >
                    ${yearlyPrice} or {monthlyPrice}/month
                </Typography>
                <Typography
                    variant="body1"
                    color="gray"
                >
                    Suggested payments with 6 months financing
                </Typography>
            </Box>
            <Colors />
            <Controls quantity={1} />
        </ContentContainer>
    )
}