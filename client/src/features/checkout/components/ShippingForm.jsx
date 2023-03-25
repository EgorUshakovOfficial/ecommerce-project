import {Box, Input, FormControl, MenuItem, Select, Typography} from '@mui/material';
import useShippingForm from '../hooks/useShippingForm';

export default function ShoppingForm(){
    // Props
    const props = useShippingForm();

    return (
        <Box>
            <FormControl>
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
            <Box>
                <Input
                    id="first-name"
                    placeholder="First name"
                    onChange={props.handleFirstNameOnChange}
                    value={props.firstName}
                    required
                />
                <Input
                    id="last-name"
                    placeholder="Last name"
                    onChange={props.handleLastNameOnChange}
                    value={props.lastName}
                    required
                />
            </Box>
            <Input
                id="company"
                placeholder="Company (optional)"
                onChange={props.handleCompanyOnChange}
                value={props.company}
            />
            <Input
                id="Address"
                placeholder="Address"
                onChange={props.handleAddressOnChange}
                value={props.address}
                required
            />
            <Input
                id="apartment-suite"
                placeholder="Apartment, suite, etc, (optional)"
                onChange={props.handleApartmentSuiteOnChange}
                value={props.apartmentSuite}
            />
            <Box>
                <Input
                    id="city"
                    placeholder="City"
                    onChange={props.handleCityOnChange}
                    value={props.city}
                />
                <FormControl>
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
                <Input
                    id="postal-code"
                    placeholder="Postal code"
                    onChange={props.handleCityOnChange}
                    value={props.postalCode}
                />
            </Box>
        </Box>
    );
}