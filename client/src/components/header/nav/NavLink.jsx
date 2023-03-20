import {Box, Button} from '@mui/material';

export default function NavLink({name, icon}){
    return (
        <Button
            disableRipple
            style={{
                color:"inherit",
                variant:"text",
                background:"transparent",
                textTransform:"none",
                fontSize:"1em",
                fontWeight:"600"
            }}
            href="#"
            endIcon={icon}
        >
            {name}
        </Button>
    );
}