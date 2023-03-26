import {Box} from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import {Button} from '../../../components';

export default function Navigation({prevPage, nextPage}){
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingBlock="1em"
        >
            <Button
                disableRipple
                href="#"
                startIcon={<KeyboardArrowLeft />}
                sx={{
                    textTransform:"none",
                    fontSize:"1em",
                    color:"black",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                  }}
            >
                {prevPage}
            </Button>
            <Button
                disableRipple
                href="#"
                sx={{
                    textTransform:"none",
                    fontSize:"1em",
                    color:"black",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                }}
            >
                {nextPage}
            </Button>
        </Box>
    );
}