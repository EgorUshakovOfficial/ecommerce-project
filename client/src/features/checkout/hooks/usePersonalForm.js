import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {populatePersonal} from '../state/checkoutSlice';
import {validateAddress, validateEmail, validateName} from '../../../utils/validators';

export default function usePersonalForm(){
    // Navigate
    const navigate = useNavigate();

    // Dispatch
    const dispatch = useDispatch();

    // Personal info global state
    const {personal} = useSelector(state => state.checkout);

    // Contact form field
    const [email, setEmail] = useState(personal.email);

    // Shipping form fields
    const [countryRegion, setCountryRegion] = useState(personal.countryRegion);

    const [firstName, setFirstName] = useState(personal.firstName);

    const [lastName, setLastName] = useState(personal.lastName);

    const [company, setCompany] = useState(personal.company);

    const [address, setAddress] = useState(personal.address);

    const [apartmentSuite, setApartmentSuite] = useState(personal.apartmentSuite);

    const [city, setCity] = useState(personal.city);

    const [region, setRegion] = useState(personal.region);

    const [postalCode, setPostalCode] = useState(personal.postalCode);

    // Callback functions for on change events
    const handleCountryRegionOnChange = event => setCountryRegion(event.target.value);

    const handleEmailOnChange = event => setEmail(event.target.value);

    const handleFirstNameOnChange = event => setFirstName(prevState => {
        // New first name
        let newFirstName = event.target.value;

        // Validates new first name
        return validateName(newFirstName) ? newFirstName : prevState;
    });

    const handleLastNameOnChange = event => setLastName(prevState => {
        // New last name
        let newLastName = event.target.value;

        return validateName(newLastName) ? newLastName : prevState;

    });

    const handleCompanyOnChange = event => setCompany(event.target.value);

    const handleAddressOnChange = event => setAddress(event.target.value);

    const handleApartmentSuiteOnChange = event => setApartmentSuite(event.target.value);

    const handleCityOnChange = event => setCity(prevState => {
        // New city
        let newCity = event.target.value;

        return validateName(newCity) ? newCity : prevState;
    });

    const handleRegionOnChange = event => setRegion(event.target.value);

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
        let validData = validateEmail(email) || validateAddress(address)

        if (missingFields.length === 0 && validData){
            // Populate personal form
            dispatch(populatePersonal(payload));

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