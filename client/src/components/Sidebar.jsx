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

/**
 * SVG_CONFIGS is an array of objects containing the SVG component and its id. 
 */
const SVG_CONFIGS = [
    { component: UpwardTriangle, id: 'upwardTriangle' },
    { component: DownwardTriangle, id: 'downwardTriangle' },
    { component: UpwardCurvedLine, id: 'upwardCurvedLine' },
    { component: DownwardCurvedLine, id: 'downwardCurvedLine' },
    { component: DownwardTriangleFilled, id: 'downwardTriangleFilled' },
    { component: UpwardTriangleFilled, id: 'upwardTriangleFilled' },
    { component: CircleFilled, id: 'circleFilled' },
];

/**
 * DraggableSVGItem is a memoized component that renders a DraggableSVG component. It is used
 * to render a draggable SVG on the sidebar. It is memoized to avoid unnecessary re-renders.
 * 
 * @param {object} props
 * @param {object} props.SVGComponent - The SVG object to render.
 * @param {string} props.id - The ID of the SVG.
 * @param {function} props.setDraggedId - Function to set the ID of the dragged SVG.
 * @param {function} props.setMovingSVG - Function to set the ID of the moving SVG.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * 
 * @returns {JSX.Element} DraggableSVGItem
 */
const DraggableSVGItem = memo(({ SVGComponent, id, setDraggedId, setMovingSVG, isDrawing }) => {
    return (
        <Grid item xs={12}>
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

/**
 * Sidebar component. It is used to render a shape on the sidebar, and to handle
 * the drag and drop functionality of the shape.
 * 
 * @param {object} props
 * @param {number} props.drawerWidth - The width of the sidebar.
 * @param {boolean} props.isSidebarOpen - Whether the sidebar is open.
 * @param {function} props.setIsSidebarOpen - Function to set whether the sidebar is open.
 * @param {function} props.setDraggedId - Function to set the ID of the dragged SVG.
 * @param {function} props.setMovingSVG - Function to set the ID of the moving SVG.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * @param {function} props.setIsDrawing - Function to set whether a shape is currently being drawn.
 * 
 * @returns {JSX.Element} Sidebar
 */
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

    /**
     * Styles for the sidebar.
     */
    const sidebarStyles = {
        width: drawerWidth,
        height: '60vh',
        overflowY: 'auto',
        marginLeft: '1rem',
        borderRadius: '15px',
        backgroundColor: '#F7F8FA',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.9,
        },
        '&::-webkit-scrollbar': {
            width: '4px',
            visibility: 'hidden',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px #B0B3B8',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888B94',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#6B6E76',
        },
        scrollbarWidth: 'thin', // For Firefox
        scrollbarColor: '#888B94 #F7F8FA', // For Firefox
    };

    /**
     * Close the sidebar.
     */
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