import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function NodeMenu({ nodeType, category, setNodeType, handleOpenSetting, handleDeleteClick, anchorEl, open, handleClose }) {

    const label = category ? (nodeType === 'default'
        ? category === 'intent'
            ? 'Start Node'
            : 'End Node'
        : category === 'intent'
            ? 'Intent Node'
            : 'End Node') : null;
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
            <MenuItem >Open Settings (To be supported)</MenuItem>
            {label && <MenuItem onClick={setNodeType}>{`Toggle to ${label}`}</MenuItem>}
            <MenuItem onClick={handleDeleteClick} style={{ color: 'red' }}>Delete</MenuItem>
        </Menu>
    )
}