import {Fragment} from 'react';
import {Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';
import { shippingOptions } from '../../../utils/constants';
import useShippingMethod from '../hooks/useShippingMethod';
import Navigation from './Navigation';

export default function ShippingMethod(){
    const {
        shippingMethod,
        handleShippingMethodOnClick,
        handleShippingMethodOnChange
    } = useShippingMethod();

    // Shipping cost
    let index = shippingOptions.findIndex(shippingOption => shippingOption.value === shippingMethod);
    let shippingOption = shippingOptions[index];
    const shippingCost = shippingOption.price;

    // Payload
    const payload = {shippingMethod, shippingCost};

    return (
        <Fragment>
            <FormControl>
                <Typography
                    variant="h2"
                    fontSize="1.125em"
                    gutterBottom
                >
                    Shipping method
                </Typography>
                <RadioGroup
                    aria-labelledby="shipping-options"
                    name="shipping-options"
                    sx={{border:"1px solid lightgray", borderRadius:"0.5em"}}
                    onChange={handleShippingMethodOnChange}
                    value={shippingMethod}
                >
                    {shippingOptions.map(({value, name, price}, idx) => {
                        // Shipping cost
                        const shippingCost = (price === 0) ? "Free" : `$${price}`;

                        return(
                            <Box
                                key={value}
                                display="grid"
                                gridTemplateColumns="max-content 1fr"
                                alignItems="center"
                                padding="0.5em 1em"
                                borderBottom={idx < shippingOptions.length-1 ?  "1px solid lightgray" : "none"}
                            >
                                <FormControlLabel value={value} control={<Radio />} label={name} />
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
            </FormControl>
            <Navigation
                prevPage={{name:"Return to information", href:"/checkout/information"}}
                nextPage={{
                    name:"Continue to payment",
                    href:"/checkout/payment",
                    payload,
                    callback: handleShippingMethodOnClick
                }}
            />
        </Fragment>
    )
}