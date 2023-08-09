import React, {useEffect, useRef, useState} from 'react';
import { Box } from "@mui/material";
import {useDrag, useDrop} from "react-dnd";
import * as d3 from "d3";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const DraggableSVGOnCanvas = ({ SVG, select, selected, setIsDrawing, setStartPosition, setLines, lines, svgPosition, allNodes, setAllNodes, isDrawing }) => {
    const [isNodeClicked, setIsNodeClicked] = useState(false);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: "svg",
        item: () => {
            return {
                id: SVG.id,
                onCanvas: true,
                oldPosition: SVG.position,
            };
        },
        canDrag: () => !isNodeClicked,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [isNodeClicked]);

    const handleClick = (e) => {
        e.stopPropagation(); // prevent the canvas click handler from firing
        select(SVG.id); // select this SVG when clicked
        setIsNodeClicked(false); // update isNodeClicked state to false
    }

    return (
        <div
            ref={node => {
                drag(node);
                preview(node);
            }}
            onClick={handleClick}
            style=
                {{
                    opacity:
                        isDragging
                            ? 0
                            : 1,
                    position: "absolute",
                    left: SVG.position.x,
                    top: SVG.position.y,
                    width: "7rem",
                    backgroundColor: "transparent",
                    zIndex: 1,
                    pointerEvents: ( isDrawing ) ? "none" : "auto",
                }}
            className="svg-container"
        >
            <SVG.component
                selected={selected || isDragging}
                setIsDrawing={setIsDrawing}
                isDrawing={isDrawing}
                setLines={setLines}
                lines={lines}
                setStartPosition={setStartPosition}
                setIsNodeClicked={setIsNodeClicked}
                svgPosition={svgPosition}
                svgId={SVG.id}
                nodeId={SVG.nodes.map(node => node.id)}
                allNodes={allNodes}
                setAllNodes={setAllNodes}
            />
        </div>
    );
};

const Canvas = ({ addSVG, SVGs, setSVGs, isDrawing, setIsDrawing }) => {
    const svgRef = useRef();
    const [lines, setLines] = useState([]);
    const [startPosition, setStartPosition] = useState({x: 0, y: 0});
    const [connections, setConnections] = useState([]);
    const [lineLetters, setLineLetters] = useState([]);
    const [selectedSVG, setSelectedSVG] = useState(null);
    const [allNodes, setAllNodes] = useState([]);
    const [isLineDialogOpen, setIsLineDialogOpen] = useState(false);
    const [selectedLineColor, setSelectedLineColor] = useState("black");

    const selectSVG = (id) => {
        setSelectedSVG(id);
    }

    const handleCanvasClick = () => {
        setSelectedSVG(null);
    }

    const [, drop] = useDrop(() => ({
        accept: "svg",
        drop: (item, monitor) => {
            const dropOffset = monitor.getSourceClientOffset();
            const canvasOffset = canvasRef.current.getBoundingClientRect();

            const position = {
                x: dropOffset.x - canvasOffset.x,
                y: dropOffset.y - canvasOffset.y
            }
            setIsLineDialogOpen(true);

            if (item.onCanvas) {
                setSVGs(prev => prev.map(svg =>
                    svg.id === item.id
                        ? {...svg, position: position}
                        : svg
                ));

                const scaleX = 2.2399307250976563
                const scaleY = 2.2399307250976563

                setLines(prev => prev.map(line => {
                    if (line.startNode.svgId === item.id) {
                        return {
                            ...line,
                            // make sure the line is connected to the node that was dropped
                            start: {
                                x: position.x + (line.startNode.x * scaleX),
                                y: position.y + (line.startNode.y * scaleY),
                            },
                        };
                    }
                    // If the SVG being moved is connected to the end of the line
                    if (line.endNode.svgId === item.id) {
                        return {
                            ...line,
                            end: {
                                x: position.x + (line.endNode.x * scaleX),
                                y: position.y + (line.endNode.y * scaleY),
                            },
                        };
                    }

                    return line;
                }));
            } else {
                addSVG(item.id, position);
            }
        },
    }));

    const handleMouseDown = (event) => {

        if (!event.target.classList.contains('node')) {
            return;
        }

        setIsDrawing(true);
        const point = d3.pointer(event);
        const nodeId = event.target.getAttribute('data-id');
        setStartPosition({x: point[0], y: point[1]});
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

        // const leftLetter = prompt("Enter a letter for the left side:");
        // const rightLetter = prompt("Enter a letter for the right side:");
        //
        // setLineLetters(prev => [...prev, {left: leftLetter, right: rightLetter}]);
    }

    const calculateControlPoint = (start, end) => {
        const midpoint = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
        };
        const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        const offset = length / 3; // adjust this value to change the curvature

        // this will curve the line upward; change the sign to curve downward
        return {
            x: midpoint.x,
            y: midpoint.y - offset,
        };
    }

    const calculateMidpoint = (start, end) => {
        return {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
        };
    };

    const handleColorSelect = (color) => {
        setSelectedLineColor(color);
        setIsLineDialogOpen(false);

        // TODO: Update the line color in your state here.
    }


    const canvasRef = useRef(null);
    drop(canvasRef)

    return (
        <Box
            ref={canvasRef}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '0',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {SVGs.map((SVG, index) => (
                <DraggableSVGOnCanvas
                    SVG={SVG}
                    selected={selectedSVG === SVG.id}
                    select={selectSVG}
                    setIsDrawing={setIsDrawing}
                    isDrawing={isDrawing}
                    setLines={setLines}
                    lines={lines}
                    setStartPosition={setStartPosition}
                    svgPosition={SVG.position}
                    allNodes={allNodes}
                    setAllNodes={setAllNodes}
                    key={`${SVG.id}-${index}`}
                />
            ))}
            <svg
                ref={svgRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={handleCanvasClick}
            >
                {lines.map((line, index) => {
                    const control = calculateControlPoint(line.start, line.end);
                    const midpoint = calculateMidpoint(line.start, line.end);
                    return (
                        <React.Fragment key={index}>
                            <text
                                x={midpoint.x - 10} // adjust this value to shift the letter to the left of the midpoint
                                y={midpoint.y}
                                fontFamily="Arial"
                                fontSize="14"
                                fill="black"
                            >
                                {lineLetters[index]?.left || ""}
                            </text>
                            <text
                                x={midpoint.x + 10} // adjust this value to shift the letter to the right of the midpoint
                                y={midpoint.y}
                                fontFamily="Arial"
                                fontSize="14"
                                fill="black"
                            >
                                {lineLetters[index]?.right || ""}
                            </text>
                            <Dialog
                                open={isLineDialogOpen}
                                onClose={() => setIsLineDialogOpen(false)}
                            >
                                <DialogTitle>Select Line Color</DialogTitle>
                                <DialogContent>
                                    <Button onClick={() => handleColorSelect('black')}>Black</Button>
                                    <Button onClick={() => handleColorSelect('yellow')}>Yellow</Button>
                                    <Button onClick={() => handleColorSelect('red')}>Red</Button>
                                    <Button onClick={() => handleColorSelect('green')}>Green</Button>
                                </DialogContent>
                            </Dialog>
                            <path
                                key={index}
                                d={`M${line.start.x},${line.start.y}Q${control.x},${control.y},${line.end.x},${line.end.y}`}
                                stroke={selectedLineColor}
                                fill="none"
                                strokeWidth={2}
                            />
                        </React.Fragment>
                    );
                })}

            </svg>
        </Box>
    );
}

export default Canvas;
