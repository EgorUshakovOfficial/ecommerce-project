import {Box, IconButton, Typography} from '@mui/material';
import {Add as AddIcon, Remove as SubtractIcon} from '@mui/icons-material';

export default function QuantityControls({
    quantity,
    incrementQuantityOnClick,
    decrementQuantityOnClick
}){
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="0.5em"
            minHeight="100"
        >
            <IconButton
                disableRipple
                onClick={decrementQuantityOnClick}
            >
                <SubtractIcon />
            </IconButton>
            <Typography
                variant="subtitle1"
                align="center"
            >
                {quantity}
            </Typography>
            <IconButton
                disableRipple
                onClick={incrementQuantityOnClick}
            >
                <AddIcon />
            </IconButton>
        </Box>
    )
}