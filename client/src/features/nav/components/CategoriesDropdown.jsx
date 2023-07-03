import {Button, Menu, MenuItem} from '@mui/material';
import {Fragment, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


// Type of categories
const categories = ['Earphones', 'Headphones', 'Airpods'];

export default function CategoriesDropdown(){
    // Anchor element
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = (anchorEl !== null);

    const handleClick = event => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <Fragment>
            <Button
                disableRipple
                color="inherit"
                style={{fontWeight:"600"}}
                fontWeight="600"
                size="medium"
                onClick={handleClick}
                aria-controls={openMenu ? 'categories-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Categories
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="categories-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx:{
                        overflow:"visible",
                        filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt:1.5,
                        '& .MuiAvatar-root':{
                            width: 32,
                            height: 32,
                            ml:-0.5,
                            mr:1
                        },
                        '&::before':{
                            content:"''",
                            display:'block',
                            position:'absolute',
                            top: 0,
                            right: 14,
                            width:10,
                            height:10,
                            bgcolor:'background.paper',
                            transform:'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{horizontal:"right", vertical:"top"}}
                anchorOrigin={{horizontal:"right", vertical:"bottom"}}
            >
                {categories.map(category => (
                    <MenuItem
                        onClick={handleClose}
                        key={`${category}-mobile`}
                    >
                        {category}
                    </MenuItem>
                ))}
            </Menu>

        </Fragment>
    )

}