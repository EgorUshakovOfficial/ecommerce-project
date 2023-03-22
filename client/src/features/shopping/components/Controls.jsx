import {Button, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {ProductControls} from '../../../components';

const ControlContainer = styled('div')({
    display:"grid",
    gridTemplateRows:"repeat(2, 1fr)",
    gridTemplateColumns:"repeat(2, 1fr)",
    gap:"0.5em",
});

export default function Controls({quantity}){
    return (
        <ControlContainer>
            <ProductControls quantity={quantity} />
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
            >
                Add to Cart
            </Button>
        </ControlContainer>
    )
}