import {Fragment} from 'react';
import {Box, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import Navigation from './Navigation';
import usePersonalForm from '../hooks/usePersonalForm';
import { validateAddress, validateEmail } from '../../../utils/validators';

export default function PersonalForm(){
    // Theme API
    const theme = useTheme();

    // Matches mobile if screen width size is at most 600px
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Personal props
    const personalProps = usePersonalForm();

    // Payload
    const payload = {
        email:personalProps.email,
        countryRegion: personalProps.countryRegion,
        firstName:personalProps.firstName,
        lastName:personalProps.lastName,
        company:personalProps.company,
        address:personalProps.address,
        apartmentSuite:personalProps.apartmentSuite,
        city:personalProps.city,
        region:personalProps.region,
        postalCode:personalProps.postalCode
    };

    return(
        <Fragment>
            <Box display="grid" gap="0.5em">
                <Typography
                    variant="h2"
                    fontSize="1.125em"
                >
                    Contact information
                </Typography>
                <TextField
                    id="email"
                    placeholder="Email"
                    label="Email"
                    type="email"
                    size="small"
                    error={!validateEmail(personalProps.email)}
                    helperText={!validateEmail(personalProps.email) ? "Enter a valid email" : ""}
                    onChange={personalProps.handleEmailOnChange}
                    value={personalProps.email}
                    required
                />
                <Box
                    display="flex"
                    alignItems="center"
                    gap="0.25em"
                >
                    <Checkbox
                        disableRipple
                        size="small"
                    />
                    <Typography variant="body2" color="gray">Email me with news and offers</Typography>
                </Box>
            </Box>
            <Box
                display="grid"
                gap="1em"
            >
                <Typography variant="h2" fontSize="1.125em">Shipping address</Typography>
                <FormControl size="small">
                    <InputLabel id="country-region-label">Country/Region</InputLabel>
                    <Select
                        labelId="country-region-label"
                        id="country-region"
                        value={personalProps.countryRegion}
                        label="Country/Region"
                        onChange={personalProps.handleCountryRegionOnChange}
                    >
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="US">US</MenuItem>
                    </Select>
                </FormControl>
                <Box
                    display="grid"
                    gridTemplateColumns={matchMobile ? "100%" : "repeat(2, 1fr)"}
                    gap="1em"
                >
                    <TextField
                        id="first-name"
                        placeholder="First name"
                        label="First name"
                        value={personalProps.firstName}
                        onChange={personalProps.handleFirstNameOnChange}
                        size="small"
                        fullWidth
                        required
                    />
                    <TextField
                        id="last-name"
                        placeholder="Last name"
                        label="Last name"
                        onChange={personalProps.handleLastNameOnChange}
                        value={personalProps.lastName}
                        size="small"
                        fullWidth
                        required
                    />
            </Box>
                <TextField
                    id="company"
                    placeholder="Company (optional)"
                    label="Company (optional)"
                    onChange={personalProps.handleCompanyOnChange}
                    value={personalProps.company}
                    size="small"
                    fullWidth
                />
                <TextField
                    id="Address"
                    placeholder="Address"
                    label="Address"
                    onChange={personalProps.handleAddressOnChange}
                    value={personalProps.address}
                    error={!validateAddress(personalProps.address)}
                    helperText={!validateAddress(personalProps.address) ? "Enter a valid address" : ""}
                    size="small"
                    fullWidth
                    required
                />
                <TextField
                    id="apartment-suite"
                    placeholder="Apartment, suite, etc, (optional)"
                    onChange={personalProps.handleApartmentSuiteOnChange}
                    label="Apartment, suite, etc, (optional)"
                    value={personalProps.apartmentSuite}
                    size="small"
                    fullWidth
                />
                <Box
                    display="grid"
                    gridTemplateColumns={matchMobile ? "100%" :"repeat(3, 1fr)"}
                    gap="0.5em"
                >
                    <TextField
                        id="city"
                        placeholder="City"
                        label="City"
                        onChange={personalProps.handleCityOnChange}
                        value={personalProps.city}
                        size="small"
                        required
                    />
                    <FormControl size="small">
                        <InputLabel id="region-label">Region</InputLabel>
                        <Select
                            labelId="region-label"
                            id="region"
                            value={personalProps.region}
                            label="Region"
                            onChange={personalProps.handleRegionOnChange}
                        >
                            <MenuItem value="Alberta">Alberta</MenuItem>
                            <MenuItem value="British Columbia">British Columbia</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="postal-code"
                        label="Postal Code"
                        placeholder="Postal code"
                        variant="outlined"
                        size="small"
                        onChange={personalProps.handlePostalCodeOnChange}
                        value={personalProps.postalCode}
                        required
                    />
                </Box>
            </Box>
            <Navigation
                prevPage={{name:"Return to cart", href:"/checkout/cart"}}
                nextPage={{
                    name:"Continue to shipping",
                    href:"/checkout/shipping",
                    payload,
                    callback: personalProps.handlePersonalFormOnClick
                }}
            />
        </Fragment>
    );
}