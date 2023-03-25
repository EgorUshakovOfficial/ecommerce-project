import {useState} from 'react';
import {Input, Button} from '@mui/material';
import Row from '../containers/Row';

export default function DiscountCode(){
    // Input
    const [input, setInput] = useState('');

    // Handles input on change
    const handleInputOnChange = event => setInput(event.target.value);

    return (
        <Row>
            <Input
                id="discount-code"
                placeholder="Gift card or discount code"
                onChange={handleInputOnChange}
                value={input}
            />
            <Button
                variant="contained"
                size="medium"
                onClick={() => {}}
            >
                Apply
            </Button>
        </Row>
    )
}