import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Ratings } from '../../../components';
import Colors from './Colors';
import Controls from './Controls';

// Content container
const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    gap:"0.5em"
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
                    variant="h4"
                    fontWeight="600"
                    gutterBottom
                >
                    {name}
                </Typography>
                <Typography
                    variant="subtitle2"
                    style={{color:"gray"}}
                    gutterBottom
                >
                    {description}
                </Typography>
            </Box>
            <Ratings
                numReviews={numReviews}
                avgRating={avgRating}
            />
            <Box
                display="flex"
                flexDirection="column"
                gap="0.25em"
            >
                <Typography
                    variant="h5"
                    fontWeight="600"
                    gutterBottom
                >
                    ${yearlyPrice} or {monthlyPrice}/month
                </Typography>
                <Typography variant="caption">Suggested payments with 6 months financing</Typography>
            </Box>
            <Colors />
            <Controls />
        </ContentContainer>
    )
}