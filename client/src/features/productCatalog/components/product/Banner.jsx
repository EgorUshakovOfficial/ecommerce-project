import {Box, Button, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import bannerImg from '../../../../assets/images/banner-image.jpg'
import { bgColor } from '../../../../utils/constants';
import {Image} from '../../../../components';

// Styled banner wrapper
const BannerWrapper = styled(Box)(({theme}) => ({
    padding: theme.spacing(4, 0),
}));

// Styled banner
const StyledBanner = styled(Box)(({theme}) => ({
    background:"#FAFAFA",
    display:"grid",
    gap:"0.5em",
    alignItems:"center",
    justifyItems:"center",
    borderRadius:"1em",
    padding: theme.spacing(2, 1)
}))

export default function Banner(){
    // Theme
    const theme = useTheme();

    // Matches width size of at least 600px-desktop view
    const matchMobile = useMediaQuery('(max-width: 886px)', {noSsr:true});

    return (
        <BannerWrapper
            sx={{
                marginInline:"auto",
                width: matchMobile ? "90%" : "100%"
            }}
        >
            <StyledBanner
                sx={{
                    gridTemplateColumns: matchMobile ?
                    "100%" : "repeat(2, 1fr)",
                    background: matchMobile ? "white" : "#FAFAFA"
                }}
            >
                <Image
                    image={bannerImg}
                    style={{minWidth: matchMobile ? 0 : 500}} // Fix this inline isse-performance optimization
                />
                <Box>
                    <Typography
                        variant="h2"
                        fontSize={matchMobile ? "1.5em" : "2.1em"}
                        marginBottom="0.5em"
                        fontWeight="600"
                    >
                        Grab Upto 50% Off On <br /> Selected Headphone
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <Button
                        disableRipple
                            variant="contained"
                            size="large"
                            style={{
                                background:bgColor,
                                fontSize:"1em",
                                borderRadius:"0.5em",
                                textTransform:"none",
                                fontWeight:600,
                            }}

                        >
                            Buy Now
                        </Button>
                    </Box>
                </Box>
            </StyledBanner>
        </BannerWrapper>
    )
}