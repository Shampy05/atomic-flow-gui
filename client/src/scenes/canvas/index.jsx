import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import * as d3 from "d3";
import Grid from "../grid";
import Line from "../../components/Lines/LineComponent"
import ShapeComponent from "../../components/Shapes/ShapeComponent";
import useCanvasDragAndDrop from "../../utils/UseCanvasDragAndDrop";

/**
 * Canvas component. It is used to render the canvas, and to handle
 * the drag and drop functionality of the shapes on the canvas. It also
 * handles the click functionality of the shapes, which is used to select
 * the shapes and to draw lines.
 * 
 * @param {object} props
 * @param {function} props.addSVG - Function to add an SVG to the canvas.
 * @param {array} props.SVGs - Array of SVGs on the canvas.
 * @param {function} props.setSVGs - Function to set the SVGs on the canvas.
 * @param {number} props.step - Grid step size.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * @param {function} props.setIsDrawing - Function to set whether a shape is currently being drawn.
 * @param {array} props.lines - Array of lines on the canvas.
 * @param {function} props.setLines - Function to set the lines on the canvas.
 * @param {number} props.zoomLevel - Zoom level of the canvas.
 * 
 * @returns {JSX.Element} Canvas
 */
const Canvas = ({ addSVG, SVGs, setSVGs, step, isDrawing, setIsDrawing, lines, setLines, zoomLevel }) => {
    const svgRef = useRef();
    const canvasRef = useRef(null);
    const [startPosition, setStartPosition] = useState({x: 0, y: 0});
    const [selectedSVG, setSelectedSVG] = useState(null);
    const [allNodes, setAllNodes] = useState([]);
    const [isLineDialogOpen, setIsLineDialogOpen] = useState(false);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
    const [isLineDrawn, setIsLineDrawn] = useState(false);

    /**
     * useEffect hook to set the canvas dimensions. This is used to calculate
     * the grid coordinates of the SVGs.
     * 
     * @returns {void}
     */
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasDimensions({
                width: canvasRef.current.clientWidth,
                height: canvasRef.current.clientHeight
            });
        }
    }, []);

    /**
     * useCallback hook to handle the drag end event. This is used to open the
     * line dialog when the user stops dragging the SVG.
     * 
     * @returns {void}
     */
    const handleDragEnd = useCallback(() => {
        setIsLineDialogOpen(true);
    }, []);

    /**
     * Function to select an SVG. This is used to select an SVG when the user
     * clicks on it.
     */
    const selectSVG = (id) => {
        setSelectedSVG(id);
    }

    /**
     * Function to handle the click event on the canvas. This is used to deselect
     * the SVG when the user clicks on the canvas. It is also used to calculate
     * the grid coordinates of the click event. This is used to draw lines.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {void}
     */
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

    /**
    * Custom hook for handling the drag and drop functionality of the shapes on the canvas.
    */
    useCanvasDragAndDrop(canvasRef, addSVG, setSVGs, setLines, handleDragEnd);

    /**
     * Function to handle the mouse down event on the canvas. This is used to draw
     * lines on the canvas. It is used to set the start position of the line, and
     * to set the end position of the line when the mouse is released.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {void}
     */
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

    /**
     * Function to handle the mouse move event on the canvas. This is used to draw
     * lines on the canvas. It is used to set the end position of the line.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {void}
     */
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

    /**
     * Function to handle the mouse up event on the canvas. It is used to set the
     * isDrawing state to false, which is used to determine whether a line is being
     * drawn.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {void}
     */
    const handleMouseUp = (event) => {
        setIsDrawing(false);
        // only set the dialog open if the mouse is released on a node
        if (isDrawing) {
            setIsLineDialogOpen(true);
        }
    }

    /**
     * useEffect hook to handle the key down event. This is used to delete the
     * selected SVG when the user presses the delete or backspace key.
     * 
     * @returns {void}
     */
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

        // Add event listener on mount
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
                    step={step}
                    isLineDrawn={isLineDrawn}
                    setIsLineDrawn={setIsLineDrawn}
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
            <Grid height={canvasDimensions.height} width={canvasDimensions.width} zoomLevel={zoomLevel} step={step}/>
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
                    canvasDimensions={canvasDimensions}
                    setSVGs={setSVGs}
                />
            </svg>
        </Box>
    );
}

export default Canvas;
