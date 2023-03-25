import {Container, Section} from '../Container';

import {
    CheckoutItems,
    DiscountCode,
    Separator,
    CostSummary
} from '../../features/checkout';

import {Logo} from '../../components';

export default function CheckoutLayout({children}){
    return (
        <Container>
            <Section>
                <Logo />
                <Separator />
                {children}
            </Section>
            <Section>
                <CheckoutItems />
                <DiscountCode />
                <CostSummary />
            </Section>
        </Container>
    );
}