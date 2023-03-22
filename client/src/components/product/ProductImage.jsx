import {Box} from '@mui/material';

export default function ProductImage({image, style}){
    return (
        <Box
            style={style}
        >
            <img
                style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"contain"
                }}
                loading="lazy"
                alt="Picture of headphones"
                src={image}
            />
        </Box>
    )
}