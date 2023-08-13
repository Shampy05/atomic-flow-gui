import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import * as d3 from "d3";
import Grid from "../grid";
import Line from "../../components/Lines/LineComponent"
import ShapeComponent from "../../components/Shapes/ShapeComponent";
import useCanvasDragAndDrop from "../../utils/UseCanvasDragAndDrop";

const Canvas = ({ addSVG, SVGs, setSVGs, isDrawing, setIsDrawing, lines, setLines }) => {
    const svgRef = useRef();
    const canvasRef = useRef(null);
    const [startPosition, setStartPosition] = useState({x: 0, y: 0});
    const [selectedSVG, setSelectedSVG] = useState(null);
    const [allNodes, setAllNodes] = useState([]);
    const [isLineDialogOpen, setIsLineDialogOpen] = useState(false);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (canvasRef.current) {
            setCanvasDimensions({
                width: canvasRef.current.clientWidth,
                height: canvasRef.current.clientHeight
            });
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        setIsLineDialogOpen(true);
    }, []);

    const selectSVG = (id) => {
        setSelectedSVG(id);
    }

    const handleCanvasClick = (event) => {
        setSelectedSVG(null);
        const point = d3.pointer(event);
        const step = 100

        // Adjust for center of canvas
        const centerX = canvasDimensions.width / 2;
        const centerY = canvasDimensions.height / 2;

        // Subtracting half the canvas dimensions to translate the origin to the center
        const translatedX = point[0] - centerX;
        const translatedY = point[1] - centerY;

        // Convert to grid coordinates based on `step`
        const gridX = translatedX / step;
        const gridY = -translatedY / step;  // Negative to adjust for the flipped SVG y-axis

        // Round off to the nearest integer for grid coordinates
        const roundedGridX = Math.round(gridX);
        const roundedGridY = Math.round(gridY);

        // Log the coordinates
    };

    useCanvasDragAndDrop(canvasRef, addSVG, setSVGs, setLines, handleDragEnd);

    const handleMouseDown = (event) => {

        if (!event.target.classList.contains('node')) {
            return;
        }

        setIsDrawing(true);
        const point = d3.pointer(event);
        setLines(prev => [...prev, {
            start: { x: point[0], y: point[1] },
            end: { x: point[0], y: point[1] },
            color: "black",
            leftText: "",
            rightText: ""
        }]);
    }


    const handleMouseMove = (event) => {
        if (!isDrawing) return;
        const point = d3.pointer(event);
        setLines(prev => {
            const lines = [...prev];
            const lastLineIndex = lines.length - 1;
            if (lastLineIndex >= 0) {
                lines[lastLineIndex] = {
                    ...lines[lastLineIndex],
                    end: {x: point[0], y: point[1]},
                };
            }
            return lines;
        });
    }

    const handleMouseUp = (event) => {
        setIsDrawing(false);
        // only set the dialog open if the mouse is released on a node
        if (isDrawing) {
            setIsLineDialogOpen(true);
        }
    }


    useEffect(() => {
        const handleKeyDown = (e) => {
            // If it's not the delete or backspace key, do nothing
            if (e.key !== "Delete" && e.key !== "Backspace") return;

            // If no SVG is selected, do nothing
            if (!selectedSVG) return;

            // Remove SVG
            const updatedSVGs = SVGs.filter(svg => svg.id !== selectedSVG);
            setSVGs(updatedSVGs);

            // Remove lines associated with the SVG
            const updatedLines = lines.filter(line => line.startNode.svgId !== selectedSVG);
            setLines(updatedLines);

            // Deselect the SVG
            setSelectedSVG(null);
        };

        document.addEventListener("keydown", handleKeyDown);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedSVG, SVGs, lines]);

    return (
        <Box
            ref={canvasRef}
            sx={{
                position: 'relative',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '0',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {SVGs.map((SVG, index) => {
                const step = 100;
                // Calculate the middle point of each SVG
                const middleX = SVG.position.x + (SVG.width / 2);
                const middleY = SVG.position.y + (SVG.height / 2);

                // Convert the middle point to grid coordinates
                const centerX = canvasDimensions.width / 2;
                const centerY = canvasDimensions.height / 2;

                const translatedX = middleX - centerX;
                const translatedY = middleY - centerY;

                const gridX = translatedX / step;
                const gridY = -translatedY / step;

                const roundedGridX = Math.round(gridX);
                const roundedGridY = Math.round(gridY);
                return (
                    <ShapeComponent
                    SVG={SVG}
                    setSVGs={setSVGs}
                    gridPosition={{ x: roundedGridX, y: roundedGridY }}
                    selected={selectedSVG === SVG.id}
                    select={selectSVG}
                    setIsDrawing={setIsDrawing}
                    isDrawing={isDrawing}
                    setLines={setLines}
                    lines={lines}
                    setStartPosition={setStartPosition}
                    setIsLineDialogOpen={setIsLineDialogOpen}
                    svgPosition={SVG.position}
                    allNodes={allNodes}
                    setAllNodes={setAllNodes}
                    canvasDimensions={canvasDimensions}
                    key={`${SVG.id}-${index}`}
                />
                )
            })}
            <Grid height={canvasDimensions.height} width={canvasDimensions.width} />
            <svg
                ref={svgRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={handleCanvasClick}
            >

                <Line
                    lines={lines}
                    setLines={setLines}
                    isLineDialogOpen={isLineDialogOpen}
                    setIsLineDialogOpen={setIsLineDialogOpen}
                />
            </svg>
        </Box>
    );
}

export default Canvas;
