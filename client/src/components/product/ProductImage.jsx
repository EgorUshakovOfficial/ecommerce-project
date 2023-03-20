import {Box} from '@mui/material';
import image from '../../assets/images/headphone.jpg';

export default function ProductImage({style}){
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