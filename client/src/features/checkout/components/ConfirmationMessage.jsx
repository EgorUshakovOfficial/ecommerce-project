import {useSelector} from 'react-redux';
import {Box} from '@mui/material';

export default function ConfirmationMessage(){
    // Personal information
    const {personal} = useSelector(state => state.checkout);

    const {firstName, lastName, email} = personal;

    return (
        <Box
            display="flex"
            style={{
                marginTop:"1em",
                justifyContent:"center"
            }}
        >
            Thank you for your order {firstName} {lastName}. An email filled with the details of your purchase has been sent to {email}!
        </Box>
    )
}