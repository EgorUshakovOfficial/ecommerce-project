import {Box} from '@mui/material';

export default function Image({image, style}){
    return (
        <Box
            style={style}
        >
            <img
                style={{ // Inline style-fix this
                    width:"100%",
                    height:"100%",
                    objectFit:"contain",
                }}
                loading="lazy"
                alt="Picture of headphones"
                src={image}
            />
        </Box>
    )
}