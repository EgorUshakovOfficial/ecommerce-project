import { useEffect } from 'react';
import {Box, IconButton} from '@mui/material';
import { Close } from '@mui/icons-material';
import {Image} from '../../../components';

export default function ReviewImage({closePreviewImageOnClick, previewImage}){
    // Scrolls smoothly to the preview image
    useEffect(() => {
        window.scrollTo({
            top:document.body.scrollHeight,
            behavior:'smooth'
        });
    }, []);

    return (
        <Box sx={{
            position:"relative",
            justifySelf:"center",
            maxWidth:250
        }}>
            <IconButton
                disableRipple
                onClick={closePreviewImageOnClick}
                sx={{
                    position:"absolute",
                    top:0,
                    left:"84%",
                }}
            >
                <Close />
            </IconButton>
            <Image image={previewImage} style={{width:250, height:250}} />
        </Box>
    );
}