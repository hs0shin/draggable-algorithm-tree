import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function NodeMenu({ handleOpenSetting, handleDeleteClick, anchorEl, open, setAnchorEl, handleMenu, handleClose }) {

    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={(e) => handleOpenSetting(e)}>Open Settings</MenuItem>
            <MenuItem onClick={() => handleDeleteClick()} style={{ color: 'red' }}>Delete</MenuItem>
        </Menu>
    )
}