import {Box, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';

export default function ProductControls({quantity}){
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="0.5em"
            minHeight="100"
        >
            <IconButton disableRipple>
                <SubtractIcon />
            </IconButton>
            <Typography
                variant="subtitle1"
                align="center"
            >
                1
            </Typography>
            <IconButton disableRipple>
                <AddIcon />
            </IconButton>
        </Box>
    )
}