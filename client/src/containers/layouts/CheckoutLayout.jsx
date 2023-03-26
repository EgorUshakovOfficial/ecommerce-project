import {Box} from '@mui/material';
import {
    CheckoutItems,
    DiscountCode,
    Separator,
    CostSummary
} from '../../features/checkout';
import {Logo} from '../../components';

export default function CheckoutLayout({children}){
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            minHeight="100vh"
        >
            <Box
                sx={{
                    paddingBlock:"3em",
                    maxWidth:540,
                    marginInline:"auto"
                }}
            >
                <Logo />
                <Separator paddingBlock="1em" />
                {children}
            </Box>
            <Box
                variant="aside"
                sx={{
                    background:"#FAFAFA",
                    paddingBlock:"3em",
                    borderLeft:"1px solid lightgray",
                }}
            >
                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        gap:"2em",
                        maxWidth:540,
                        marginLeft:"2em"
                    }}
                >
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
                </Box>
            </Box>
        </Box>
    );
}