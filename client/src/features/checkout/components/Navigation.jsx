import {Box, useMediaQuery, useTheme} from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import {Button} from '../../../components';

export default function Navigation({prevPage, nextPage}){
    // Theme
    const theme = useTheme();

    // Matches width screen size of at least 600px
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                flexDirection: matchMobile ? "column":"row",
                gap: matchMobile ? "0.25em" : 0
            }}
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
                onClick={event => nextPage.callback(event, nextPage.payload)}
            >
                {nextPage.name}
            </Button>
        </Box>
    );
}