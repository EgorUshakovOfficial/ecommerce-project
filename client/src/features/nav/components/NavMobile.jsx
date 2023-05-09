import {useState, Fragment} from 'react';
import {Box, Collapse, Drawer, IconButton, Typography} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Menu as MenuIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import {Button} from '../../../components';

// Button style
const btnStyle = {
    textTransform:"none",
    fontSize:"1.25em",
    display:"block",
    textAlign:"center"
};

const navLinks = ["Deals", "What's New", "Delivery"];

const types = ['Earphone', 'Headphones', 'Airpods'];

export default function NavMobile(){
    // State of the mobile navigation menu
    const [mobileOpen, setMobileOpen] = useState(false);

    // Expands categories menu
    const [expandCategories, setExpandCategories] = useState(false);

    // Opens mobile navigation menu
    const handleMobileOpenOnClick = () => setMobileOpen(true);

    // Expands categories menu
    const handleExpandCategoriesOnClick = () => setExpandCategories(prevState => !prevState);

    // Collpases categories menu
    const handleExpandCategoriesOnClose = () => setExpandCategories(false);

    // Closes mobile navigation menu
    const handleMobileOpenOnClose = () => setMobileOpen(false);

    return (
        <Fragment>
            <IconButton
                disableRipple
                onClick={handleMobileOpenOnClick}
            >
                <MenuIcon fontSize="large"/>
            </IconButton>
            <Drawer
                open={mobileOpen}
                onClose={handleMobileOpenOnClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                    },
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    padding="0.5em"
                >
                    <IconButton
                        onClick={handleMobileOpenOnClose}
                        style={{
                            color:"inherit",
                            background:"transparent"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box variant="nav">
                    {navLinks.map(navLink => (
                        <Button
                            disableRipple
                            color="inherit"
                            onClick={handleMobileOpenOnClose}
                            sx={btnStyle}
                            fullWidth
                            href={`/${navLink}`}
                        >
                            {navLink}
                        </Button>
                    ))}
                    <Box
                        display='flex'
                        alignItems="center"
                        justifyContent="center"
                        gap="0.25em"
                    >
                        <Typography fontSize="1.25em">Categories</Typography>
                        <IconButton
                            disableRipple
                            onClick={handleExpandCategoriesOnClick}
                        >
                            <ExpandMoreIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Collapse in={expandCategories} timeout="auto">
                        {types.map(type => (
                        <Button
                            disableRipple
                            style={btnStyle}
                            color="inherit"
                            onClick={handleMobileOpenOnClose}
                        >
                            {type}
                        </Button>
                        ))}
                    </Collapse>
                </Box>
            </Drawer>
        </Fragment>
    )
}