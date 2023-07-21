import React, { useState } from "react";
import {
    Menu as MenuIcon,
    SettingsOutlined,
    HelpOutlineOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppBar, IconButton, Box, useTheme } from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <AppBar
            sx={{
                display: "flex",
                boxShadow: "none",
                width: "100%",
                height: "fit-content",
            }}
        >
            <Box display="flex" justifyContent="space-between">
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} value={isSidebarOpen}>
                    <MenuIcon />
                </IconButton>

                <Box>
                    <IconButton>
                        <HelpOutlineOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </IconButton>
                </Box>
            </Box>
        </AppBar>
    );
};

export default Navbar;
