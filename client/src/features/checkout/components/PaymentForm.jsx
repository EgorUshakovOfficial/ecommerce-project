import {Box, Input, Tooltip} from '@mui/material';

import {
    LockedOutlined as LockOutlinedIcon,
    HelpOutlineRounded as HelpOutlineRoundedIcon
} from '@mui/icons-material';

import usePaymentForm from '../hooks/usePaymentForm';

import {helpCaption, secureCaption} from '../../../data/constants/captions';

export default function PaymentForm(){
    // Field values and on change events
    const props = usePaymentForm();

    return (
        <Box>
            <Input
                type="text"
                placeholder="Card Number"
                value={props.cardNumber}
                onChange={props.handleCardNumberOnChange}
                endAdornment={
                    <Tooltip title={secureCaption}>
                        <LockOutlinedIcon />
                    </Tooltip>
                }
            />
            <Input
                type="text"
                placeholder="Cardholder name"
                value={props.cardholder}
                onChange={props.handleCardholderOnChange}
            />
            <Box>
                <Input
                    placeholder='Expiration date(MM / YY)'
                    type="text"
                    value={props.expirationDate}
                    onChange={props.handleExpirationDateOnChange}
                />
                <Input
                    placeholder='Security code'
                    type="text"
                    value={props.securityCode}
                    onChange={props.handleSecurityCodeOnChange}
                    endAdornment={
                        <Tooltip title={helpCaption}>
                            <HelpOutlineRounded />
                        </Tooltip>
                    }
                />
            </Box>
        </Box>
    );
}