import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

const StyledTable = styled('div')( ({theme}) => ({}));

export default function SummaryInfo(){
    <StyledTable>
        <Box
            display="flex"
            alignItems="center"
            width="96%"
            margin="auto"
            gap="0.5em"
        >
            <Box>
                <Typography variant="body1" color="gray">Contact</Typography>
                <Typography variant="body1">egorushakov@gmail.com</Typography>
            </Box>
            <Link to="#">
                Change
            </Link>
        </Box>
        <Box
            display="flex"
            alignItems="center"
            width="96%"
            margin="auto"
            gap="0.5em"
        >
            <Box>
                <Typography variant="body1" color="gray">Ship to</Typography>
                <Typography> 584 Stonegate Way Northwest, Airdrie AB T4B 3C9, Canada</Typography>
            </Box>
            <Link to="#">Change</Link>
        </Box>
    </StyledTable>
};