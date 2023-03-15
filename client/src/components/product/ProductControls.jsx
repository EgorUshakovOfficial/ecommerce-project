import {Box, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';

export default function ProductControls({quantity}){
    return (
        <Box>
            <IconButton>
                <SubtractIcon />
            </IconButton>
            <Typography
                variant="subtitle1"
                align="center"
            >
                {quantity}
            </Typography>
            <IconButton>
                <AddIcon />
            </IconButton>
        </Box>
    )
}