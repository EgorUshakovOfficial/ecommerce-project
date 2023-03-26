import {useState} from 'react';
import {Box, Button, TextField} from '@mui/material';

export default function DiscountCode(props){
    // Input
    const [input, setInput] = useState('');

    // Handles input on change
    const handleInputOnChange = event => setInput(event.target.value);

    return (
        <Box
            display="grid"
            gridTemplateColumns = "minmax(0, 1fr) minmax(auto, max-content)"
            gap="0.5em"
            {...props}
        >
            <TextField
                id="discount-code"
                placeholder="Gift card or discount code"
                onChange={handleInputOnChange}
                value={input}
                size="small"
            />
            <Button
                disableRipple
                variant="contained"
                size="small"
                color="success"
            >
                Apply
            </Button>
        </Box>
    )
}