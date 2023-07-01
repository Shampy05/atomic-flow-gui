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
import CenteredBox from "./CenteredBox";


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
            <CenteredBox
                position="fixed"
                top={0} // Position from top
                left={0} // Position from left
                bottom={0} // Position from bottom
            >
                {isSidebarOpen && (
                    <Box
                        open={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        sx={{
                            width: drawerWidth,
                            height: '50vh',
                            backgroundColor: theme.palette.background.alt,
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                )}
            </CenteredBox>
        </Box>
    )
}

export default Sidebar