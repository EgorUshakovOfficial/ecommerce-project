import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Ratings } from '../../../components';
import Colors from './Colors';
import Controls from './Controls';
import { calculateHalfCost } from '../../../helper';
import useColors from '../hooks/useColors';

// Content container
const ContentContainer = styled('div')({
    display:"flex",
    flexDirection:"column",
    gap:"2em"
});

export default function Content({product, reviews}){
    // Colors
    const colors = product.product_images
    .map(({id:colorId, color_name:colorName, hexacode, main_image:mainImage}) => ({colorId, colorName, hexacode, mainImage}));

    // Extract selected color and call back associated with it from colors object
    const {selectedColor, handleColorClick} = useColors(colors);

    // Half-monthly payment
    const halfYearlyPrice = calculateHalfCost(product.price);

    // Initialize the total number of reviews associated with the product
    const totalReviews = reviews.length;

    // Calculates the average rating of the product
    const avgRating = reviews
    .reduce((avgRating, {rating}) => (rating/totalReviews) + rating, 0);

    return (
        <ContentContainer>
            <Box>
                <Typography
                    variant="h3"
                    fontWeight="600"
                    gutterBottom
                >
                    {product.title}
                </Typography>
                <Typography
                    variant="body1"
                    color="gray"
                    gutterBottom
                >
                    {product.description}
                </Typography>
                <Ratings numReviews={totalReviews} avgRating={avgRating} />
            </Box>
            <Box
                pt="2em"
                pb="2em"
                borderTop="1px solid lightgray"
                borderBottom="1px solid lightgray"
             >
                <Typography
                    variant="h4"
                    fontWeight="600"
                    gutterBottom
                >
                    ${product.price} or {halfYearlyPrice}/month
                </Typography>
                <Typography
                    variant="body1"
                    color="gray"
                >
                    Suggested payments with 6 months financing
                </Typography>
            </Box>
            <Colors
                selectedColor={selectedColor}
                colors={colors}
                handleColorClick={handleColorClick}
            />
            <Controls
                selectedColor={selectedColor}
                quantity={product.quantity}
            />
        </ContentContainer>
    )
}