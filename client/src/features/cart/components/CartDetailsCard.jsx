import {Box, IconButton, styled, Typography} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Image } from '../../../components';
import QuantityControls from './QuantityControls';
import useCartItem from '../hooks/useCartItem';

// Styled card
const StyledBox = styled(Box)(({theme}) => ({
    position:"relative",
    display:"flex",
    borderRadius:"0.5em",
    padding:"0.5em",
    justifyContent:"space-evenly",
    boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"
}));

export default function CartDetailsCard({cartItem}){
    // Destructure cart item object
    const {id, title, image, color, price, quantity} = cartItem;

    const {
        decrementQuantityOnClick,
        incrementQuantityOnClick,
        removeCartItemOnClick
    } = useCartItem(cartItem);

    return (
        <StyledBox key={id}>
            <IconButton
                disableRipple
                onClick={removeCartItemOnClick}
                sx={{
                    position:"absolute",
                    top:0,
                    left:"90%"
                }}
            >
                <Close />
            </IconButton>
            <Image
                image={image}
                style={{width:250, height:250}}
            />
            <Box
                display="grid"
                gridTemplateRows="repeat(2, max-content)"
                alignContent="space-evenly"
            >
                <Box
                    display="grid"
                    gap="0.5em"
                    justifyItems="center"
                >
                    <Typography
                        variant="h2"
                        fontSize="1.25em"
                        fontWeight="600"
                    >
                        {title}
                    </Typography>
                    <Typography>{color}</Typography>
                    <Typography
                        fontWeight="600"
                    >
                        {price}
                    </Typography>
                </Box>
                <QuantityControls
                    quantity={quantity}
                    incrementQuantityOnClick={incrementQuantityOnClick}
                    decrementQuantityOnClick={decrementQuantityOnClick}
                />
            </Box>

        </StyledBox>
    )
}