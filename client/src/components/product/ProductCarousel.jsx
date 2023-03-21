import {Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import Product from './Product';
import {Section} from '../../containers';
import {cartItems} from '../../mock/cartItems';

// Inner wrapper
const CarouselContainer = styled('div')( ({theme}) => ({
    display:"grid",
    gridAutoColumns: "calc(25% - 0.5em)",
    gridAutoFlow:"column",
    gap:"0.5em",
    overflowX:"auto",
    padding: theme.spacing(2, 1)
}));

export default function ProductCarousel({id, title}){
    return (
        <Section id={id}>
            <Typography
                variant="h4"
                gutterBottom
                fontWeight="600"
            > {title}
            </Typography>
            <CarouselContainer>
                {cartItems.map(product => <Product {...product} />)}
            </CarouselContainer>
        </Section>
    )
}