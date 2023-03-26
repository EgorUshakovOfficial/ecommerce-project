import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

export default function Logo(props){
    return(
        <Link to="/" {...props}>
            <Box variant="div">
                <Typography variant="h4">Logo</Typography>
            </Box>
        </Link>
    );
}