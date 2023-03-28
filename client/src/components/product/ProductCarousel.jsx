import {Box, Typography, useMediaQuery} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Product from './Product';
import {cartItems} from '../../mock/cartItems';

// Inner wrapper
const CarouselContainer = styled(Box)( ({theme}) => ({
    display:"grid",
    gap:"0.5em",
    overflowX:"auto",
    padding: theme.spacing(2, 0),
}));

export default function ProductCarousel({id, title}){
    // Theme
    const theme = useTheme();

    // Matches screen sizes with width of up to and including 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box id={id} paddingBlock="2em">
            <Typography
                variant="h4"
                fontWeight="600"
                gutterBottom
            >
                {title}
            </Typography>
            <CarouselContainer
                gridAutoColumns={matchDesktop ? "350px" : "90%"}
                gridAutoFlow={matchDesktop ? "column" : "none"}
            >
                {cartItems.map(product => <Product {...product} />)}
            </CarouselContainer>
        </Box>
    )
}