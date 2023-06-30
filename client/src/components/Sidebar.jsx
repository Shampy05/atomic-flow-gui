import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    useEffect,
    useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
                 }) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [activeRoute, setActiveRoute] = useState("")
    const theme = useTheme()
    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            background: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? "0px" : "2px",
                            width: drawerWidth,
                        }
                    }}
                >

                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar