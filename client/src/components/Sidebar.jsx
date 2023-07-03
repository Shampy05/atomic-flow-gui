import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    Grid,
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
import {
    UpwardTriangle,
    DownwardTriangle,
    UpwardCurvedLine,
    DownwardCurvedLine,
    DownwardTriangleFilled,
    UpwardTriangleFilled,
    CircleFilled
} from "./SVGComponents";

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
                            overflow: 'auto',
                            backgroundColor: theme.palette.background.alt,
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >
                        {/* Order items inside sidebar such that they are on a grid */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <UpwardTriangle />
                            </Grid>
                            <Grid item xs={6}>
                                <DownwardTriangle />
                            </Grid>
                            <Grid item xs={6}>
                                <UpwardCurvedLine />
                            </Grid>
                            <Grid item xs={6}>
                                <DownwardCurvedLine />
                            </Grid>
                            <Grid item xs={6}>
                                <DownwardTriangleFilled />
                            </Grid>
                            <Grid item xs={6}>
                                <UpwardTriangleFilled />
                            </Grid>
                            <Grid item xs={6}>
                                <CircleFilled />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </CenteredBox>
        </Box>
    )
}

export default Sidebar