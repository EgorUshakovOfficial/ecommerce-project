import {Box, Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import bannerImg from '../../assets/images/banner-image.jpg'
import { bgColor } from '../../data/styles/colors';

// Styled banner wrapper
const BannerWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(4, 0),
}));

// Styled banner
const StyledBanner = styled('div')(({theme}) => ({
    display:"flex",
    justifyContent:"space-evenly",
    alignItems:"center",
    gap:"1em",
}))

export default function Banner(){
    return (
        <BannerWrapper>
            <StyledBanner>
                <Box>
                    <Typography
                        variant="h4"
                        marginBottom="0.5em"
                        fontWeight="600"
                    >
                        Grab Upto 50% Off On Selected Headphone
                    </Typography>
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
                <div>
                <img
                    style={{
                        width:"100%",
                        height:"100%",
                        objectFit:"cover",
                        borderRadius:"1em"
                    }}
                    src={bannerImg}
                />
                </div>
            </StyledBanner>
        </BannerWrapper>
    )
}