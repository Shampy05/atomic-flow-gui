import React, { memo } from 'react';
import { Box, Grid, useTheme, Paper, Divider } from "@mui/material";
import CenteredBox from "./CenteredBox";

import {
    UpwardTriangle,
    DownwardTriangle,
    UpwardCurvedLine,
    DownwardCurvedLine,
    DownwardTriangleFilled,
    UpwardTriangleFilled,
    CircleFilled
} from "./Shapes";
import DraggableSVG from "./DraggableSVG";

const SVG_CONFIGS = [
    { component: UpwardTriangle, id: 'upwardTriangle' },
    { component: DownwardTriangle, id: 'downwardTriangle' },
    { component: UpwardCurvedLine, id: 'upwardCurvedLine' },
    { component: DownwardCurvedLine, id: 'downwardCurvedLine' },
    { component: DownwardTriangleFilled, id: 'downwardTriangleFilled' },
    { component: UpwardTriangleFilled, id: 'upwardTriangleFilled' },
    { component: CircleFilled, id: 'circleFilled' },
];

const DraggableSVGItem = memo(({ SVGComponent, id, setDraggedId, setMovingSVG, isDrawing }) => {
    return (
        <Grid item xs={6}>
            <DraggableSVG
                SVGComponent={SVGComponent}
                id={id}
                setDraggedId={setDraggedId}
                setMovingSVG={setMovingSVG}
                isDrawing={isDrawing}
            />
            <Divider light />
        </Grid>
    );
});

const Sidebar = ({
                     drawerWidth,
                     isSidebarOpen,
                     setIsSidebarOpen,
                     setDraggedId,
                     setMovingSVG,
                     isDrawing,
                     setIsDrawing
                 }) => {
    const theme = useTheme();

    const sidebarStyles = {
        width: drawerWidth,
        height: '60vh',
        overflowY: 'auto',
        marginLeft: '1rem',
        borderRadius: '15px',
        backgroundColor: theme.palette.background.alt,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.9,
        },
    };

    const handleClose = async () => {
        try {
            setIsSidebarOpen(false);
            console.log('Sidebar closed successfully');
        } catch (error) {
            console.error('Error while closing sidebar:', error);
        }
    };

    return (
        <Box component="nav">
            <CenteredBox position="fixed" top={0} left={0} bottom={0}>
                {isSidebarOpen && (
                    <Paper elevation={3} sx={sidebarStyles} onClose={handleClose}>
                        <Grid container spacing={2}>
                            {SVG_CONFIGS.map(({ component, id }, index) => (
                                <DraggableSVGItem
                                    key={index}
                                    SVGComponent={component}
                                    id={id}
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    isDrawing={isDrawing}
                                    setIsDrawing={setIsDrawing}
                                />
                            ))}
                        </Grid>
                    </Paper>
                )}
            </CenteredBox>
        </Box>
    );
}

export default Sidebar;