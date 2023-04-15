import {Box, useMediaQuery, useTheme} from '@mui/material';
import {
    Section,
    Separator,
    SummaryMobileSection,
    SummarySection,
} from '../../features/checkout';
import {Logo} from '../../components';

export default function CheckoutLayout({children}){
    // Theme
    const theme = useTheme();

    // Matches width screen size of at most 600px
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display:"grid",
                gridTemplateColumns: matchMobile ? "100%" : "repeat(2, 1fr)",
                minHeight:"100vh",
                width:matchMobile ? "90%" : "100%",
                marginInline: matchMobile ? "auto" : "none"
            }}
        >
            <Section style={{marginInline: matchMobile ? "none" : "auto"}}>
                <Logo />
                {matchMobile && <SummaryMobileSection />}
                <Separator />
                {children}
            </Section>
            {matchMobile === false &&
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