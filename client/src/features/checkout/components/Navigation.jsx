import {Box} from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import {Button} from '../../../components';

export default function Navigation({prevPage, nextPage}){
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Button
                disableRipple
                to="/cart"
                size="medium"
                startIcon={<KeyboardArrowLeft />}
            >
                {prevPage}
            </Button>
            <Button
                disableRipple
                to="/shipping"
                size="medium"
            >
                {nextPage}
            </Button>
        </Box>
    );
}