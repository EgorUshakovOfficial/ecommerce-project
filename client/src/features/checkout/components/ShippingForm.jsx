import {Box, InputLabel, FormControl, MenuItem, Select, Typography, TextField} from '@mui/material';
import useShippingForm from '../hooks/useShippingForm';

export default function ShoppingForm(){
    const props = useShippingForm();

    return (
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
                    value={props.countryRegion}
                    label="Country/Region"
                    onChange={props.handleCountryRegionOnChange}
                >
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="US">US</MenuItem>
                </Select>
            </FormControl>
            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                gap="1em"
            >
                <TextField
                    id="first-name"
                    placeholder="First name"
                    label="First name"
                    onChange={props.handleFirstNameOnChange}
                    value={props.firstName}
                    size="small"
                    fullWidth
                    required
                />
                <TextField
                    id="last-name"
                    placeholder="Last name"
                    label="Last name"
                    onChange={props.handleLastNameOnChange}
                    value={props.lastName}
                    size="small"
                    fullWidth
                    required
                />
            </Box>
            <TextField
                id="company"
                placeholder="Company (optional)"
                label="Company (optional)"
                onChange={props.handleCompanyOnChange}
                value={props.company}
                size="small"
                fullWidth
            />
            <TextField
                id="Address"
                placeholder="Address"
                label="Address"
                onChange={props.handleAddressOnChange}
                value={props.address}
                size="small"
                fullWidth
                required
            />
            <TextField
                id="apartment-suite"
                placeholder="Apartment, suite, etc, (optional)"
                onChange={props.handleApartmentSuiteOnChange}
                label="Apartment, suite, etc, (optional)"
                value={props.apartmentSuite}
                size="small"
                fullWidth
            />
            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap="0.5em"
            >
                <TextField
                    id="city"
                    placeholder="City"
                    label="City"
                    onChange={props.handleCityOnChange}
                    value={props.city}
                    size="small"
                    required
                />
                <FormControl size="small">
                    <InputLabel id="region-label">Region</InputLabel>
                    <Select
                        labelId="region-label"
                        id="region"
                        value={props.region}
                        label="Region"
                        onChange={props.handleRegionOnChange}
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
                    onChange={props.handleCityOnChange}
                    value={props.postalCode}
                    required
                />
            </Box>
        </Box>
    );
}