import {Fragment, useState} from 'react';
import {Menu, MenuItem, Button} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Slug name for id
export default function FilterDropdown({typeFilter, typeFilterOptions}){
    // Anchor element
    const [anchorEl, setAnchorEl] = useState(null);

    // Opens menu if anchor element is defined
    const openMenu = anchorEl !== null;

    // Events
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // Slug name
    const slugName = typeFilter.toLowerCase().split(/\s/).join("-");

    // Creates id based off slug name
    const id = `${slugName}-id`;

    return (
        <Fragment>
            <Button
                id={id}
                disableRipple
                color="inherit"
                size="medium"
                variant="contained"
                style={{
                    textTransform:"none",
                    fontWeight:600,
                    borderRadius:"0.75em",
                    boxShadow:"none"
                }}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}

            >
                {typeFilter}
            </Button>
            <Menu
                id={`${slugName}-menu`}
                anchorEl={anchorEl}
                open={openMenu}
                MenuListProps={{'aria-labelledby':id}}
                onClick={handleClose}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {typeFilterOptions.map(filter => <MenuItem onClick={handleClick}>{filter}</MenuItem>)}
            </Menu>
        </Fragment>
    )
}