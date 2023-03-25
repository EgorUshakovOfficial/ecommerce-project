import {useState} from 'react';

export default function useShippingForm(){
    // State of the fields
    const [countryRegion, setCountryRegion] = useState('');

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [company, setCompany] = useState('');

    const [address, setAddress] = useState('');

    const [apartmentSuite, setApartmentSuite] = useState('');

    const [city, setCity] = useState('');

    const [region, setRegion] = useState('');

    const [postalCode, setPostalCode] = useState('');

    // On Change events
    const handleCountryRegionOnChange = event => setCountryRegion(event.target.value);

    const handleFirstNameOnChange = event => setFirstName(event.target.name);

    const handleLastNameOnChange = event => setLastName(event.target.value);

    const handleCompanyOnChange = event => setCompany(event.target.value);

    const handleAddressOnChange = event => setAddress(event.target.value);

    const handleApartmentSuiteOnChange = event => setApartmentSuite(event.target.value);

    const handleCityOnChange = event => setCity(event.target.value);

    const handleRegionOnChange = event => setRegion(event.target.value);

    const handlePostalCodeOnChange = event => setPostalCode(event.target.value);

    return {
        countryRegion,
        firstName,
        lastName,
        company,
        address,
        apartmentSuite,
        city,
        region,
        postalCode,
        handleCountryRegionOnChange,
        handleFirstnameOnChange,
        handleLastNameOnChange,
        handleCompanyOnChange,
        handleAddressOnChange,
        handleApartmentSuiteOnChange,
        handleCityOnChange,
        handleRegionOnChange,
        handlePostalCodeOnChange,
    }
}