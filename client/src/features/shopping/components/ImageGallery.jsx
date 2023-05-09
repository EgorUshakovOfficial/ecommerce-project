import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import { Image } from "../../../components";

const IMAGE_WIDTH = 140, IMAGE_HEIGHT = 140;

// Image container
const ImageContainer = styled(Box)({
    display:"inline-flex",
    flexDirection:"column",
    gap:"1em"
});

// Image list
const ImageList = styled(Box)({
    display:"flex",
    alignItems:"center",
    justifyContent:"space-evenly",
    gap:"1em",
});

export default function ImageGallery({mainImage, otherImages}){
    return (
        <ImageContainer>
            <Image
                image={mainImage}
                style={{width:"auto", height:"600px"}} // Fix this inline style
            />
            <ImageList>
                {otherImages.map(image => (<Image
                    image={image}
                    style={{width:IMAGE_WIDTH,
                        height:IMAGE_HEIGHT
                    }}
                />)
                )}
            </ImageList>
        </ImageContainer>
    )
}