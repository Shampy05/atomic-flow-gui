import React from 'react';
import {
    Box,
    Grid,
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
import { useDrag } from "react-dnd";

const DraggableSVG = ({ SVGComponent, id, setDraggedId }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "svg",
        item: () => {
            setDraggedId(id);
            return { id };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <SVGComponent />
        </div>
    );
};



const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    setDraggedId
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
                                <DraggableSVG SVGComponent={UpwardTriangle} id="upwardTriangle" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={DownwardTriangle} id="downwardTriangle" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={UpwardCurvedLine} id="upwardCurvedLine" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={DownwardCurvedLine} id="downwardCurvedLine" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={DownwardTriangleFilled} id="downwardTriangleFilled" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={UpwardTriangleFilled} id="upwardTriangleFilled" setDraggedId={setDraggedId} />
                            </Grid>
                            <Grid item xs={6}>
                                <DraggableSVG SVGComponent={CircleFilled} id="circleFilled" setDraggedId={setDraggedId} />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </CenteredBox>
        </Box>
    )
}

export default Sidebar