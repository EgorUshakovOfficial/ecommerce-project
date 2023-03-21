import {Box, Button, IconButton, Typography} from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import ProductImage from "./ProductImage";
import ProductRatings from '../Ratings';

// Styled product div
const ProductDiv = styled('div')( ({theme}) => ({
    gap:"0.5em",
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius:"0.5em",
    padding: theme.spacing(2),
}));

export default function Product({
    id,
    name,
    cost,
    description
}){
    return (
        <ProductDiv>
            <Box
                width="100%"
                alignSelf="center"
                position="relative"
                display="flex"
                justifyContent="center"
            >
                <ProductImage style={{width:250, height:"auto"}} />
                <IconButton
                    style={{
                        position:"absolute",
                        top: 0,
                        right:0
                    }}
                    disableRipple
                >
                    <FavoriteBorder />
                </IconButton>
            </Box>
            <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
            >
                <Typography variant="subtitle1" fontWeight="600">{name}</Typography>
                <Typography variant="subtitle1" fontWeight="600">{cost}</Typography>
            </Box>
            <Typography variant="caption">{description}</Typography>
            <ProductRatings avgRating={4} numReviews={121} />
            <Button
                disableRipple
                variant="outlined"
                style={{borderRadius:"0.5em", textTransform:"none"}}
                color="inherit"
                onClick={() => {}}
            >
                Add to Cart
            </Button>
        </ProductDiv>
    );
}