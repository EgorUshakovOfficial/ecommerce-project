import {Button, Menu, MenuItem} from '@mui/material';
import {Fragment, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
                id="categories-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                onClick={handleClick}
                PaperProps={{}}
                transformOrigin={{horizontal:"right", vertical:"bottm"}}
                anchorOrigin={{horizontal:"right", vertical:"bottom"}}
            >
                <MenuItem onClick={handleClose}>
                    <MenuItem>
                        Earphones
                    </MenuItem>
                    <MenuItem>
                        Headphones
                    </MenuItem>
                    <MenuItem>
                        Airpods
                    </MenuItem>
                </MenuItem>
            </Menu>

        </Fragment>
    )

}