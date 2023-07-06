import React,{ useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
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
    // console.log(UpwardTriangle, DownwardTriangle, UpwardCurvedLine, DownwardCurvedLine, DownwardTriangleFilled, UpwardTriangleFilled, CircleFilled);
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [SVGs, setSVGs] = useState([]);
    const [draggedId, setDraggedId] = useState(null);

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
                <Canvas addSVG={addSVG} SVGs={SVGs} /> {/* Pass SVGs as a prop */}
            </Box>
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                setDraggedId={setDraggedId}
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
