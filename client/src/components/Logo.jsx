import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

export default function Logo(){
    return(
        <Link to="/">
            <Box variant="div">
                <Typography variant="h4">Logo</Typography>
            </Box>
        </Link>
    );
}