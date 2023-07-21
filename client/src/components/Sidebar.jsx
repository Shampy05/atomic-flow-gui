import React from 'react';
import {
    Box,
    Grid,
    useTheme
} from "@mui/material";
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
import DraggableSVG from "./DraggableSVG";

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    setDraggedId,
    setMovingSVG,
    movingSVG
                 }) => {
    const theme = useTheme()
    return (
        <Box
            component="nav"
        >
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={UpwardTriangle}
                                    id="upwardTriangle"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={DownwardTriangle}
                                    id="downwardTriangle"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={UpwardCurvedLine}
                                    id="upwardCurvedLine"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={DownwardCurvedLine}
                                    id="downwardCurvedLine"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={DownwardTriangleFilled}
                                    id="downwardTriangleFilled"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={UpwardTriangleFilled}
                                    id="upwardTriangleFilled"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG
                                    SVGComponent={CircleFilled}
                                    id="circleFilled"
                                    setDraggedId={setDraggedId}
                                    setMovingSVG={setMovingSVG}
                                    movingSVG={movingSVG}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </CenteredBox>
        </Box>
    )
}

export default Sidebar