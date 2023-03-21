import {useState} from 'react';
import {Tooltip, Box, Typography} from '@mui/material';
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
    // Active state
    const [active, setActive] = useState("Red");

    // Handle color on click
    const handleColorOnClick = event => setActive(event.target.value);

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>Choose a Color</Typography>
            <ColorContainer>
                {colors.map( ({color, hexCode}) => (
                    <Tooltip title={color}>
                        <Box
                            onClick={handleColorOnClick}
                            sx={{
                                value: color,
                                style:{
                                    background:hexCode,
                                    height:64,
                                    width:64,
                                    borderRadius:"50%",
                                    border: (active === color)
                                    ? "1px solid black": "none"
                                }
                            }}
                        />
                    </Tooltip>
                ))}
            </ColorContainer>
        </Box>
    )
};