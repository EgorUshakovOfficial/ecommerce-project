import {Box, useMediaQuery, useTheme} from '@mui/material';

export default function Section({children, style}){
    // Theme API
    const theme = useTheme();

    // Matches width screen size of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                gap: matchDesktop ? "1.6em" : "0.8em",
                paddingBlock: matchDesktop ? "3em" : "1em",
                maxWidth:540,
                ...style
            }}
        >
            {children}
        </Box>
    )
}

// export default Section;

