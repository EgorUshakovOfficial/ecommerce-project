import {Tooltip, Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import useColors from '../hooks/useColors';

// Color Container
const ColorContainer = styled('div')(({theme}) => ({
    display:"flex",
    alignItems:"center",
    gap: "0.5em"
}));

export default function Colors({colors, handleColorClick, selectedColor}){
    return (
        <Box
            pb="2em"
            borderBottom="1px solid lightgray"
        >
            <Typography
                variant="h5"
                fontWeight="600"
                gutterBottom
            >
                Choose a Color
            </Typography>
            <ColorContainer>
                {colors.map( ({colorName, hexacode}) => (
                    <Tooltip title={colorName}>
                        <Box
                            style={{
                                padding:"0.25em",
                                border:(selectedColor == colorName) ?
                                    "1px solid black": "none",
                                borderRadius:"50%"
                            }}
                        >
                            <Box
                                value={colorName}
                                onClick={handleColorClick}
                                style={{
                                    cursor:"pointer",
                                    background:`#${hexacode}`,
                                    height:40,
                                    width:40,
                                    borderRadius:"50%"
                                }}
                            />
                        </Box>
                    </Tooltip>)
                )}
             </ColorContainer>
        </Box>
    )
};