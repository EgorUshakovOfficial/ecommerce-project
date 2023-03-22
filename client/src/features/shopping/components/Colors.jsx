import {useState} from 'react';
import {Tooltip, RadioGroup, Radio, Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

// Colors
const colors = [
    {color:"Red", hexCode:"#8b0000"},
    {color:"Blue", hexCode:"#00004D"},
    {color:"Pink", hexCode:"#F699CD"},
    {color:"Green", hexCode:"#028A0F"},
    {color:"Gray", hexCode:"#787276"}
];

// Color Container
const ColorContainer = styled('div')(({theme}) => ({
    display:"flex",
    alignItems:"center",
    gap: "0.5em"
}));

export default function Colors(){
    // Selected color
    const [selectedColor, setSelectedColor] = useState("Red");

    // Handle selected color on click
    const handleClick = event => setSelectedColor(event.target.getAttribute('value'));

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
                {colors.map( ({color, hexCode}) => (
                    <Tooltip title={color}>
                        <Box
                            style={{
                                padding:"0.25em",
                                border:(selectedColor == color) ?
                                    "1px solid black": "none",
                                borderRadius:"50%"
                            }}
                        >
                            <Box
                                value={color}
                                onClick={handleClick}
                                style={{
                                    cursor:"pointer",
                                    background:hexCode,
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