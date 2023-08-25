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
} from "../../components/Shapes";
import ExportButton from "../../components/ExportButton";

const SVGComponents = {
    upwardTriangle: UpwardTriangle,
    downwardTriangle: DownwardTriangle,
    upwardCurvedLine: UpwardCurvedLine,
    downwardCurvedLine: DownwardCurvedLine,
    downwardTriangleFilled: DownwardTriangleFilled,
    upwardTriangleFilled: UpwardTriangleFilled,
    circleFilled: CircleFilled
}

const SVGNodes = {
    upwardTriangle: [{x: 0.5, y: 0.1}, {x: 0.9, y: 0.8}, {x: 0.1, y: 0.8}, {x: 0.5, y: 0.1}],
    downwardTriangle: [{x: 0.5, y: 0.9}, {x: 0.9, y: 0.2}, {x: 0.1, y: 0.2}, {x: 0.5, y: 0.9}],
    upwardCurvedLine: [{x: 0.2, y: 0.6}, {x: 0.8, y: 0.6}],
    downwardCurvedLine: [{x: 0.2, y: 0.4}, {x: 0.8, y: 0.4}],
    downwardTriangleFilled: [{x: 0.5, y: 0.9}, {x: 0.9, y: 0.2}, {x: 0.1, y: 0.2}, {x: 0.5, y: 0.9}],
    upwardTriangleFilled: [{x: 0.5, y: 0.1}, {x: 0.9, y: 0.8}, {x: 0.1, y: 0.8}, {x: 0.5, y: 0.1}],
    circleFilled: [{x: 0.5, y: 0.1}, {x: 0.5, y: 0.9}, {x: 0.5, y: 0.1}, {x: 0.5, y: 0.9}, {x: 0.5, y: 0.1}, {x: 0.5, y: 0.9}]
}

const Layout = () => {
    const [movingSVG, setMovingSVG] = useState(null);
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [SVGs, setSVGs] = useState([]);
    const [lines, setLines] = useState([]);
    const [draggedId, setDraggedId] = useState(null);
    const [count, setCount] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const step = 100 * zoomLevel;

    const handleSnapToGrid = () => {
        console.log("Snap to Grid")
    }

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom * 1.1);
    }

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => prevZoom * 0.9);
    }

    const onExportLatex = () => {
        SVGs.forEach(svg => {
            console.log("svg", svg);
        })

        lines.forEach(line => {
            console.log(line);
        })
    }

    const addSVG = (i, position) => {
        const newSVG = {
            id: uuidv4(),
            position: position,
            component: SVGComponents[i],
            shapeType: i,
            lines: [],
            nodes: SVGNodes[i].map(node => ({ ...node, id: uuidv4(), svgPosition: position })),
            gridCoordinates: { x: null, y: null },
            width: 112,
            height: 112,
        };

        console.log("Layout.jsx -> newSVG: ", newSVG);

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
                    isDrawing={isDrawing}
                    setIsDrawing={setIsDrawing}
                    lines={lines}
                    setLines={setLines}
                    step={step}
                    zoomLevel={zoomLevel}
                    style={{ cursor: isDrawing ? 'crosshair' : 'grab' }}
                />
            </Box>
            <Sidebar
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                setDraggedId={setDraggedId}
                setMovingSVG={setMovingSVG}
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
            />
            <RightButtons
                onSnapToGrid={handleSnapToGrid}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
            />
            <ExportButton
                onExportLatex={onExportLatex}
                SVGs={SVGs}
                lines={lines}
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
