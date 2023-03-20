import {Box} from '@mui/material';
import { PRODUCT_IMAGE_HEIGHT } from '../../data/constants/productConstants';

import image from '../../assets/images/headphone.jpg';

const style = {width: "auto", height: PRODUCT_IMAGE_HEIGHT};

export default function ProductImage(){
    return (
        <Box
            style={style}
        >
            <img
                style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                }}
                loading="lazy"
                alt="Picture of headphones"
                src={image}
            />
        </Box>
    )
}