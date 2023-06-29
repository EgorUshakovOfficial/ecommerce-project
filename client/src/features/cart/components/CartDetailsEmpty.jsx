import { Button } from '../../../components';
import {Box, Typography} from '@mui/material';

export default function CartDetailsEmpty(){
    return (
        <Box
            display="grid"
            justifyItems="center"
            gap="0.25em"
        >
            <Typography
                textAlign="center"
            >
                Your cart is empty<br />
            </Typography>
            <Button
                disableRipple
                variant="contained"
                sx={{
                    "background":"black",
                    "&:hover":{background:"black"}}
                }
                href="/"
            >
                Shop our products
            </Button>
        </Box>
    )
}
