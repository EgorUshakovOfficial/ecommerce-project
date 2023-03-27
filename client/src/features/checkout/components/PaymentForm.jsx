import {Box, TextField, Tooltip, Typography} from '@mui/material';

import {
    HttpsOutlined as HttpsOutlinedIcon,
    HelpOutlineRounded as HelpOutlineRoundedIcon
} from '@mui/icons-material';

import usePaymentForm from '../hooks/usePaymentForm';

import {helpCaption, secureCaption} from '../../../data/constants/captions';

export default function PaymentForm(){
    // Field values and on change events
    const props = usePaymentForm();

    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="1.125em"
                gutterBottom
            >
                Payment
            </Typography>
            <Box
                display="grid"
                gap="0.5em"
                sx={{
                    background:"#FAFAFA",
                    padding:"1em",
                    borderRadius:"0.5em",
                    border:"1px solid lightgray"
                }}
            >
                <TextField
                    type="text"
                    placeholder="Card number"
                    label="Card number"
                    value={props.cardNumber}
                    size="small"
                    sx={{background:"white"}}
                    onChange={props.handleCardNumberOnChange}
                    InputProps={{
                        endAdornment:(
                            <Tooltip title={secureCaption}>
                                <HttpsOutlinedIcon />
                            </Tooltip>
                        )
                    }}
                />
                <TextField
                    type="text"
                    placeholder="Cardholder name"
                    label="Cardholder name"
                    size="small"
                    value={props.cardholder}
                    sx={{background:"white"}}
                    onChange={props.handleCardholderOnChange}
                />
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap="0.25em"
                >
                    <TextField
                        placeholder='Expiration date(MM / YY)'
                        type="text"
                        label="Expiration date(MM/YY)"
                        value={props.expirationDate}
                        size="small"
                        sx={{background:"white"}}
                        onChange={props.handleExpirationDateOnChange}
                    />
                    <TextField
                        placeholder='Security code'
                        type="password"
                        label="Security code"
                        size="small"
                        sx={{background:"white"}}
                        InputProps={{
                            endAdornment:(
                                <Tooltip title={helpCaption}>
                                    <HelpOutlineRoundedIcon />
                                </Tooltip>
                            )
                        }}
                        value={props.securityCode}
                        onChange={props.handleSecurityCodeOnChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}