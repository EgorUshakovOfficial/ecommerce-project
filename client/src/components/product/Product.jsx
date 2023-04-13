import {Box, IconButton, Typography} from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import Button from '../utils/Button';
import ProductImage from "./ProductImage";
import ProductRatings from '../Ratings';

// Styled product div
const ProductDiv = styled('div')( ({theme}) => ({
    gap:"0.5em",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"flex-start",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    border:"1px solid lightgray",
    borderRadius:"0.5em",
    padding: theme.spacing(2),
    minWidth:250,
}));

export default function Product({
    productId,
    name,
    cost,
    description,
    image
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
                <ProductImage image={image} style={{width:250, height:250}} />
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
                href={`/product-page/${productId}`}
            >
                Add to Cart
            </Button>
        </ProductDiv>
    );
}