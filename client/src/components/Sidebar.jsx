import React from 'react';
import { Box, Grid, useTheme } from "@mui/material";
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

const DraggableSVGItem = ({ SVGComponent, id, setDraggedId, setMovingSVG, isDrawing }) => (
    <Grid item xs={6}>
        <DraggableSVG
            SVGComponent={SVGComponent}
            id={id}
            setDraggedId={setDraggedId}
            setMovingSVG={setMovingSVG}
            isDrawing={isDrawing}
        />
    </Grid>
)

const Sidebar = ({
                     drawerWidth,
                     isSidebarOpen,
                     setIsSidebarOpen,
                     setDraggedId,
                     setMovingSVG,
                     isDrawing,
                     setIsDrawing
                 }) => {
    const theme = useTheme()

    const sidebarStyles = {
        width: drawerWidth,
        height: '50vh',
        overflow: 'auto',
        backgroundColor: theme.palette.background.alt,
        '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        },
    }

    const handleClose = () => {
        setIsSidebarOpen(false);
        // other logic...
    };

    return (
        <Box component="nav">
            <CenteredBox position="fixed" top={0} left={0} bottom={0}>
                {isSidebarOpen && (
                    <Box
                        open={isSidebarOpen}
                        onClose={handleClose}
                        sx={sidebarStyles}

                    >
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
                    </Box>
                )}
            </CenteredBox>
        </Box>
    )
}

export default Sidebar;
