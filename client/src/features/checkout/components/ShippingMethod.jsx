import {Box, Radio, RadioGroup, Typography} from '@mui/material';
import { shippingOptions } from '../../../data/constants';

export default function ShippingMethod(){
    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="1.125em"
                gutterBottom
            >
                Shipping method
            </Typography>
            <RadioGroup
                aria-labelledby="shipping-options"
                defaultValue="free-shipping"
                name="shipping-options"
                sx={{border:"1px solid lightgray",borderRadius:"0.5em"}}
            >
                {shippingOptions.map((shippingOption, idx) => {
                    const {value, name, price} = shippingOption;

                    // Shipping cost
                    const shippingCost = (price === 0) ? "Free" : `$${price}`;

                    return(
                        <Box
                            display="grid"
                            gridTemplateColumns="max-content 1fr 1fr"
                            alignItems="center"
                            padding="0.5em 1em"
                            borderBottom={idx < shippingOptions.length-1 ?  "1px solid lightgray" : "none"}
                        >
                            <Radio name="shipping-options" value={value} />
                            <Typography variant="body1" pl="0.5em">{name}</Typography>
                            <Typography
                                variant="body1"
                                fontWeight="600"
                                align="right"
                            >
                                {shippingCost}
                            </Typography>
                        </Box>
                    );
                })}
            </RadioGroup>
        </Box>
    )
}