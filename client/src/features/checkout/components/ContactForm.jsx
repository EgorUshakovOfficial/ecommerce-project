import {useState} from 'react';
import {Box, Checkbox, TextField, Typography} from '@mui/material';

export default function ContactForm(){
    // Email
    const [email, setEmail] = useState('');

    // Email input on change
    const handleEmailOnChange = event => setEmail(event.target.value);

    return (
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
                onChange={handleEmailOnChange}
                value={email}
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
    );
}