import {Box} from '@mui/material';
import Container from '../Container';

import {
    CheckoutItems,
    DiscountCode,
    Separator,
    CostSummary
} from '../../features/checkout';

import {Logo} from '../../components';

export default function CheckoutLayout({children}){
    return (
        <Container
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="1em"
            paddingBlock="3em"
        >
            <Box>
                <Logo />
                <Separator paddingBlock="1em" />
                {children}
            </Box>
            <Box
                width="60%"
                marginInline="auto"
            >
                <CheckoutItems />
                <DiscountCode />
                <CostSummary />
            </Box>
        </Container>
    );
}