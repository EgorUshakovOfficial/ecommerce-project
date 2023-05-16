import {Fragment} from 'react';
import { useSelector } from 'react-redux';
import {Alert, Box, TextField, Tooltip, Typography, useMediaQuery, useTheme} from '@mui/material';
import {
    HttpsOutlined as HttpsOutlinedIcon,
    HelpOutlineRounded as HelpOutlineRoundedIcon
} from '@mui/icons-material';
import usePaymentForm from '../hooks/usePaymentForm';
import {helpCaption, secureCaption} from '../../../utils/constants';
import Navigation from './Navigation';
import { validateCardNumber, validateExpirationDate} from '../../../utils/validators';

export default function PaymentForm(){
    // Theme API
    const theme = useTheme();

    // Matches width screen size of at most 600px
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Order
    const order = useSelector(state => state.order);

    // Field values and callabcks on different trigger events
    const paymentProps = usePaymentForm();

    // Payload
    const payload = {
        cardNumber: paymentProps.cardNumber,
        cardholder: paymentProps.cardholder,
        expirationDate: paymentProps.expirationDate,
        securityCode: paymentProps.securityCode
    };

    return (
        <Fragment>
            {order.error !== null && <Alert
                severity="error"
                color="error"
                onClose={paymentProps.handleCardErrorOnClick}
            >
                {order.error.data.message}
            </Alert>}
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
                        value={paymentProps.cardNumber}
                        size="small"
                        error={!validateCardNumber(paymentProps.cardNumber)}
                        helperText={!validateCardNumber(paymentProps.cardNumber) ? "Enter a valid card number" : ""}
                        sx={{background:"white"}}
                        onChange={paymentProps.handleCardNumberOnChange}
                        InputProps={{
                            endAdornment:(
                                <Tooltip title={secureCaption}>
                                    <HttpsOutlinedIcon />
                                </Tooltip>
                            )
                        }}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Cardholder name"
                        label="Cardholder name"
                        size="small"
                        value={paymentProps.cardholder}
                        sx={{background:"white"}}
                        onChange={paymentProps.handleCardholderOnChange}
                        required
                    />
                    <Box
                        display="grid"
                        gridTemplateColumns={matchMobile ? "100%" : "repeat(2, 1fr)"}
                        gap={matchMobile ? "0.5em" : "0.25em"}
                    >
                        <TextField
                            placeholder='Expiration date (MM/YY)'
                            type="text"
                            label="Expiration date(MM/YY)"
                            value={paymentProps.expirationDate}
                            size="small"
                            error={!validateExpirationDate(paymentProps.expirationDate)}
                            helperText={!validateExpirationDate(paymentProps.expirationDate)
                                 ? "Enter a valid expiration date" : ""
                            }
                            sx={{background:"white"}}
                            onChange={paymentProps.handleExpirationDateOnChange}
                            required
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
                            value={paymentProps.securityCode}
                            onChange={paymentProps.handleSecurityCodeOnChange}
                            required
                        />
                    </Box>
                </Box>
            </Box>
            <Navigation
                prevPage={{name:"Return to shipping", href:"/checkout/shipping"}}
                nextPage={{
                    name:"Pay now",
                    href:"#",
                    payload,
                    callback: paymentProps.handlePaymentFormOnClick
                }}
            />
        </Fragment>
    );
}