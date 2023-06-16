import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {populatePersonal} from '../../../app/state/checkoutSlice';
import {validateAddress, validateEmail, validateName} from '../../../utils/validators';

export default function usePersonalForm(){
    // Navigate API
    const navigate = useNavigate();

    // Dispatch API
    const dispatch = useDispatch();

    // Personal information state
    const {personal} = useSelector(state => state.checkout);

    // Email address
    const [email, setEmail] = useState(personal.email);

    // State of country or region
    const [countryRegion, setCountryRegion] = useState(personal.countryRegion);

    // State of the first name
    const [firstName, setFirstName] = useState(personal.firstName);

    // State of the last name
    const [lastName, setLastName] = useState(personal.lastName);

    // State of the company or business
    const [company, setCompany] = useState(personal.company);

    // State of the street address
    const [address, setAddress] = useState(personal.address);

    // State of the apartment or suite
    const [apartmentSuite, setApartmentSuite] = useState(personal.apartmentSuite);

    // State of the city
    const [city, setCity] = useState(personal.city);

    // State of the region, such as province or state
    const [region, setRegion] = useState(personal.region);

    // State of the postal code
    const [postalCode, setPostalCode] = useState(personal.postalCode);

    // Handles country or region as input changes
    const handleCountryRegionOnChange = event => setCountryRegion(event.target.value);

    // Handles email as input of it changes
    const handleEmailOnChange = event => setEmail(event.target.value);

    // Validates and handles first name as input changes
    const handleFirstNameOnChange = event => setFirstName(prevState => {
        // New first name
        let newFirstName = event.target.value;

        // Ensures first name only contains alpha characters
        return validateName(newFirstName) ? newFirstName : prevState;
    });

    // Handles and validates last name as input changes
    const handleLastNameOnChange = event => setLastName(prevState => {
        // New last name
        let newLastName = event.target.value;

        // Ensures last name only has alpha characters
        return validateName(newLastName) ? newLastName : prevState;

    });

    // Handles company as input changes
    const handleCompanyOnChange = event => setCompany(event.target.value);

    // Handles street address as input changes
    const handleAddressOnChange = event => setAddress(event.target.value);

    // Handles apartment or suite as input changes
    const handleApartmentSuiteOnChange = event => setApartmentSuite(event.target.value);

    // Handles city as input changes
    const handleCityOnChange = event => setCity(prevState => {
        // New city
        let newCity = event.target.value;

        // Validates new city of having only alpha characters in it
        return validateName(newCity) ? newCity : prevState;
    });

    // Handles region-state or province-as input changes
    const handleRegionOnChange = event => setRegion(event.target.value);

    // Handles postal code or zip as input changes
    const handlePostalCodeOnChange = event => setPostalCode(event.target.value);

    // Handles personal form on click
    const handlePersonalFormOnClick = (event, payload) => {
        // Prevents form from being submitted to the server
        event.preventDefault();

        // Select all of the required form fields
        const requiredFields = document.querySelectorAll('input[required]');

        // Missing fields
        const missingFields = [];

        // Add required fields that are empty to missing fields
        requiredFields.forEach(input => {
            if (input.value === ""){
                missingFields.push(input);
            }
        });

        // Adds red border to missing fields
        missingFields.forEach(input => input.classList.add('error'));

        // Validate email and street address
        let validData = validateEmail(email) && validateAddress(address)

        if (missingFields.length === 0 && validData){
            // Populate personal form
            dispatch(populatePersonal({...payload, isSubmitted:true}));

            // Navigate to the shipping method of the checkout form
            navigate('/checkout/shipping', {replace:true});
        }

    }

    return {
        countryRegion,
        email,
        firstName,
        lastName,
        company,
        address,
        apartmentSuite,
        city,
        region,
        postalCode,
        handleCountryRegionOnChange,
        handleEmailOnChange,
        handleFirstNameOnChange,
        handleLastNameOnChange,
        handleCompanyOnChange,
        handleAddressOnChange,
        handleApartmentSuiteOnChange,
        handleCityOnChange,
        handleRegionOnChange,
        handlePersonalFormOnClick,
        handlePostalCodeOnChange
    }
}