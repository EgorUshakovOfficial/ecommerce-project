import {Box, Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import bannerImg from '../../assets/images/banner-image.jpg'
import { bgColor } from '../../data/styles/colors';

// Styled banner wrapper
const BannerWrapper = styled(Box)(({theme}) => ({
    padding: theme.spacing(4, 0),
}));

// Styled banner
const StyledBanner = styled(Box)(({theme}) => ({
    background:"#FAFAFA",
    display:"grid",
    gap:"0.5em",
    gridTemplateColumns:"repeat(auto-fit, minmax(500px, 1fr))",
    alignItems:"center",
    justifyItems:"center",
    borderRadius:"1em",
    padding: theme.spacing(2, 1)
}))

export default function Banner(){
    return (
        <BannerWrapper>
            <StyledBanner>
                <Box minWidth="500px">
                    <img src={bannerImg}/>
                </Box>
                <Box>
                    <Typography
                        variant="h4"
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