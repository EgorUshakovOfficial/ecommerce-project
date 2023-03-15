import {Box, Button} from '@mui/material';

export default function NavLink({name, icon}){
    <Box>
        <Button
            disableRipple
            color="inherit"
            variant="text"
            size="medium"
            href="#"
            endIcon={icon}
        >
            {name}
        </Button>
    </Box>
}