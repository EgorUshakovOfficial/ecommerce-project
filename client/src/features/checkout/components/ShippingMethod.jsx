import {Box, Radio, RadioGroup, Typography} from '@mui/material';
import { shippingOptions } from '../../../data/constants';

export default function ShippingMethod(){
    return (
        <RadioGroup
            aria-labelledby="shipping-options"
            defaultValue="free-shipping"
            name="shipping-options"
        >
            {shippingOptions.map(shippingOption => {
                const {value, name, price} = shippingOption;

                // Shipping cost
                const shippingCost = (price === 0) ? "free" : `$${price}`;

                return(
                    <Box>
                        <Radio name="shipping-options" value={value} />
                        <Box>
                            <Typography variant="body1">{name}</Typography>
                            <Typography
                                variant="body1"
                                fontWeight="600"
                            >
                                {shippingCost}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </RadioGroup>
    )
}