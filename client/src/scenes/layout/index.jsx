import React,{ useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import RightButtons from "../../components/RightButtons";
import Canvas from "../canvas";
import { v4 as uuidv4 } from "uuid";

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
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [SVGs, setSVGs] = useState([]);
    const [draggedId, setDraggedId] = useState(null);
    const [count, setCount] = useState(0);
    const [selectedSVG, setSelectedSVG] = useState(null);


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
        const newSVG = {
            id: uuidv4(),
            position: position,
            component: SVGComponents[i],
            isSelected: false
        };

        setSVGs((SVGs) => [...SVGs, newSVG]);
        setCount(count + 1);
    };

    return (
        <Box
            display =
                {isNonMobile
                ? "flex"
                : "block"}
            width="100%"
            height="100%"
            position="relative"
        >
            <Box
                position="absolute"
                width="100%"
                height="100%"
                zIndex="0"
            >
                <Canvas
                    addSVG={addSVG}
                    SVGs={SVGs}
                    setSVGs={setSVGs}
                    movingSVG={movingSVG}
                    setMovingSVG={setMovingSVG}
                    setSelectedSVG={setSelectedSVG}
                    selectedSVG={selectedSVG}
                />
            </Box>
            <Sidebar
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
