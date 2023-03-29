import {Box, useMediaQuery, useTheme} from '@mui/material';
import {
    Section,
    Separator,
    SummaryMobileSection,
    SummarySection
} from '../../features/checkout';
import {Logo} from '../../components';

export default function CheckoutLayout({children}){
    // Theme
    const theme = useTheme();

    // Matches width screen size of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                display:"grid",
                gridTemplateColumns:matchDesktop ? "repeat(2, 1fr)" : "100%",
                minHeight:"100vh",
                width:matchDesktop ? "100%" : "90%",
                marginInline: matchDesktop ? "none" : "auto"
            }}
        >
            <Section style={{marginInline:"auto"}}>
                <Logo />
                {matchDesktop === false && <SummaryMobileSection />}
                <Separator />
                {children}
            </Section>
            {matchDesktop &&
                <Box
                    variant="aside"
                    sx={{
                        background:"#FAFAFA",
                        paddingBlock:"3em",
                        borderLeft:"1px solid lightgray",
                    }}
                >
                    <SummarySection style={{marginLeft:"2em"}} />
                </Box>
            }
        </Box>
    );
}