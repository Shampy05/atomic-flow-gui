import React from "react";
import {
    Menu as MenuIcon,
    SettingsOutlined,
    HelpOutlineOutlined,
} from "@mui/icons-material";
import { AppBar, IconButton, Box } from "@mui/material";

/**
 * Navbar component containing the menu, settings, and help buttons.
 * 
 * @param {object} props
 * @param {boolean} props.isSidebarOpen - Whether the sidebar is open
 * @param {function} props.setIsSidebarOpen - Function to set whether the sidebar is open
 * 
 * @returns {JSX.Element} Navbar
 */
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
