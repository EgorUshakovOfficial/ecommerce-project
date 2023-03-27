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
                href={prevPage.href}
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
                {prevPage.name}
            </Button>
            <Button
                disableRipple
                href={nextPage.href}
                sx={{
                    textTransform:"none",
                    fontSize:"1em",
                    color:"black",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                }}
            >
                {nextPage.name}
            </Button>
        </Box>
    );
}