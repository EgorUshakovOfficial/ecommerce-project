import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {
    CheckoutItems,
    DiscountCode,
    Separator,
    CostSummary
} from '../../features/checkout';
import {Logo} from '../../components';

const Section = styled(Box)({
    display:"flex",
    flexDirection:"column",
    gap:"1.6em",
    paddingBlock:"3em",
    maxWidth:540
});

export default function CheckoutLayout({children}){
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            minHeight="100vh"
        >
            <Section sx={{marginInline:"auto"}}>
                <Logo />
                <Separator />
                {children}
            </Section>
            <Box
                variant="aside"
                sx={{
                    background:"#FAFAFA",
                    paddingBlock:"3em",
                    borderLeft:"1px solid lightgray",
                }}
            >
                <Section sx={{marginLeft:"2em"}}>
                    <CheckoutItems
                        style={{
                            paddingBlock:"0.5em",
                            borderBottom:"1px solid lightgray"
                        }}
                    />
                    <DiscountCode  />
                    <CostSummary
                        style={{
                            borderTop:"1px solid lightgray",
                            paddingBlock:"0.5em"
                        }}
                        subtotal={1718.19}
                        shippingCost={12.99}
                    />
                </Section>
            </Box>
        </Box>
    );
}