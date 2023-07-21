import React,{ useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import RightButtons from "../../components/RightButtons";
import Canvas from "../canvas";
import {
    UpwardTriangle,
    DownwardTriangle,
    UpwardCurvedLine,
    DownwardCurvedLine,
    DownwardTriangleFilled,
    UpwardTriangleFilled,
    CircleFilled
} from "../../components/SVGComponents";

const SVGComponents = {
    upwardTriangle: UpwardTriangle,
    downwardTriangle: DownwardTriangle,
    upwardCurvedLine: UpwardCurvedLine,
    downwardCurvedLine: DownwardCurvedLine,
    downwardTriangleFilled: DownwardTriangleFilled,
    upwardTriangleFilled: UpwardTriangleFilled,
    circleFilled: CircleFilled
}

const Layout = () => {
    const [movingSVG, setMovingSVG] = useState(null);

    // console.log(UpwardTriangle, DownwardTriangle, UpwardCurvedLine, DownwardCurvedLine, DownwardTriangleFilled, UpwardTriangleFilled, CircleFilled);
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [SVGs, setSVGs] = useState([]);
    const [draggedId, setDraggedId] = useState(null);

    const handleSnapToGrid = () => {
        console.log("Snap to Grid")
    }

    const handleZoomIn = () => {
        console.log("Zoom In");
        // Logic for zooming in goes here
    }

    const handleZoomOut = () => {
        console.log("Zoom Out");
        // Logic for zooming out goes here
    }

    const addSVG = (i, position) => {
        console.log("SVGComponents:", SVGComponents);
        console.log("SVGComponents[i]:", SVGComponents[i]);
        console.log("id:", i);

        const newSVG = {
            id: i,
            position: position,
            component: SVGComponents[i] // Here we're storing the component, not the called function
        };

        console.log("newSVG:", newSVG);
        setSVGs((SVGs) => [...SVGs, newSVG]);
    };

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" position="relative">
            <Box position="absolute" width="100%" height="100%" zIndex="0">
                <Canvas
                    addSVG={addSVG}
                    SVGs={SVGs}
                    setSVGs={setSVGs}
                    movingSVG={movingSVG}
                    setMovingSVG={setMovingSVG}
                /> {/* Pass SVGs as a prop */}
            </Box>
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                setDraggedId={setDraggedId}
                setMovingSVG={setMovingSVG}
            />
            <RightButtons
                onSnapToGrid={handleSnapToGrid}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
            />
            <Box>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;
