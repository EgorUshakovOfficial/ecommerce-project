import {useParams} from 'react-router-dom';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {Add as AddIcon, Remove as SubtractIcon} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import useControls from '../hooks/useControls';

const ControlContainer = styled('div')({
    display:"grid",
    gridTemplateRows:"repeat(2, 1fr)",
    gridTemplateColumns:"repeat(2, max-content)",
    alignItems:"center",
    alignContent:"center",
    gap:"0.5em",
});

export default function Controls({selectedColor, quantity}){
    // Retrieve product id from the url
    const {productId} = useParams();

    const {
        addCartItemOnClick,
        decrementQuantityToAddOnClick,
        incrementQuantityToAddOnClick,
        quantityToAdd
    } = useControls(selectedColor);

    return (
        <ControlContainer>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="0.5em"
                minHeight="100"
            >
                <IconButton
                    disableRipple
                    onClick={decrementQuantityToAddOnClick}
                >
                    <SubtractIcon />
                </IconButton>
                <Typography
                    variant="subtitle1"
                    align="center"
                >
                    {quantityToAdd}
                </Typography>
                <IconButton
                    disableRipple
                    onClick={incrementQuantityToAddOnClick}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Typography variant="body1" lineHeight="1.5">
                Only <Typography variant="span" fontWeight="600">{quantity} item</Typography> Left!<br />
                Don't miss it
            </Typography>
            <Button
                disableRipple
                style={{
                    color:"white",
                    background:"black"
                }}
                variant="contained"
                size="large"
            >
                Buy Now
            </Button>
            <Button
                disableRipple
                color="inherit"
                variant="outlined"
                size="large"
                onClick={addCartItemOnClick}
            >
                Add to Cart
            </Button>
        </ControlContainer>
    )
}