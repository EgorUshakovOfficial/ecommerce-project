import {useState} from 'react';
import {Box, Checkbox, Input, Typography} from '@mui/material';

export default function ContactForm(){
    // Email
    const [email, setEmail] = useState('');

    // Email input on change
    const handleEmailOnChange = event => setEmail(event.target.value);

    return (
        <Box>
            <Typography variant="subtitle1">Contact information</Typography>
            <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
            />
            <Box>
                <Checkbox checked={false} />
                <Typography variant="body2">Email me with news and offers</Typography>
            </Box>
        </Box>
    );
}