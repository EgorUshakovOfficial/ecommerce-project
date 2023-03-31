import {Box, Typography, useMediaQuery} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import Product from './Product';
import {products} from '../../mock/products';

// Inner wrapper
const CarouselContainer = styled(Box)( ({theme}) => ({
    display:"grid",
    gap:"0.5em",
    overflowX:"auto"
}));

export default function ProductCarousel(props){
    const {id, title} = props;

    // Theme
    const theme = useTheme();

    // Matches width screen sizes with of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            id={id}
            sx={{
                width: matchDesktop ? "100%" : "90%",
                marginInline:"auto"
            }}
            {...props}
        >
            <Typography
                variant="h2"
                fontSize={matchDesktop ? "2.1em" : "1.5em"}
                fontWeight="600"
                gutterBottom
            >
                {title}
            </Typography>
            <CarouselContainer
                gridAutoColumns={matchDesktop ? "350px" : "100%"}
                gridAutoFlow={matchDesktop ? "column" : "none"}
            >
                {products.map(product => <Product {...product} />)}
            </CarouselContainer>
        </Box>
    )
}