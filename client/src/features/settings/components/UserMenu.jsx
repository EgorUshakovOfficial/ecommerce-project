import {Fragment} from 'react';
import {Avatar, Box, IconButton, Divider, Menu, MenuItem, Tooltip, Typography, ListItemIcon, useMediaQuery} from '@mui/material';
import {Settings, Logout} from '@mui/icons-material';
import useUserMenu from '../hooks/useUserMenu';

// Avatar width and height
const AVATAR_WIDTH = 48, AVATAR_HEIGHT = 48;

export default function UserMenu(){
    const {
        anchorElement,
        firstName,
        openUserMenu,
        initials,
        matchMobile,
        handleLogout,
        handleUserMenuOnClick,
        handleUserMenuOnClose
    } = useUserMenu();



    return (
        <Fragment>
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="0.25em"
            > */}
            <Tooltip title="Account settings">
                <IconButton
                    disableRipple
                    onClick={handleUserMenuOnClick}
                    size="medium"
                >
                    <Avatar sx={{width:AVATAR_WIDTH, height:AVATAR_HEIGHT,}}>
                        {initials}
                    </Avatar>
                </IconButton>
            </Tooltip>
              {/* {matchMobile===false && <Typography
                variant="body1"
                fontSize="1em"
              >
                {firstName}
              </Typography>} */}
            <Menu
                anchorEl={anchorElement}
                id="user-menu"
                open={openUserMenu}
                onClick={handleUserMenuOnClose}
                onClose={handleUserMenuOnClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: AVATAR_WIDTH,
                        height: AVATAR_HEIGHT,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleUserMenuOnClose}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleUserMenuOnClose}>
                  <ListItemIcon>
                    <Settings size="small"/>
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout size="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
            </Menu>
        </Fragment>
    );
}