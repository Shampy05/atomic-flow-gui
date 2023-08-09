import React, {useEffect, useRef, useState} from 'react';
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDrag, useDrop} from "react-dnd";
import * as d3 from "d3";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField } from "@mui/material";

function LinePropertiesDialog({ isOpen, onClose, onSave }) {
    const [color, setColor] = useState('');
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');
    const [lineType, setLineType] = useState('single');  // 'single' or 'double'

    const handleSave = () => {
        onSave(color, leftText, rightText, lineType);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Choose Line Color and Text</DialogTitle>
            <DialogContent>
                <TextField
                    label="Left Text"
                    variant="outlined"
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Right Text"
                    variant="outlined"
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <div>
                    <Button onClick={() => setColor('black')} style={{ color: 'black' }}>
                        Black
                    </Button>
                    <Button onClick={() => setColor('yellow')} style={{ color: 'yellow' }}>
                        Yellow
                    </Button>
                    <Button onClick={() => setColor('red')} style={{ color: 'red' }}>
                        Red
                    </Button>
                    <Button onClick={() => setColor('green')} style={{ color: 'green' }}>
                        Green
                    </Button>
                </div>
                <div>
                    <RadioGroup
                        value={lineType}
                        onChange={(e) => setLineType(e.target.value)}
                    >
                        <FormControlLabel value="single" control={<Radio />} label="Single Line" />
                        <FormControlLabel value="double" control={<Radio />} label="Double Line" />
                    </RadioGroup>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

const DraggableSVGOnCanvas = ({ SVG, select, selected, setIsDrawing, setStartPosition, setLines, lines, svgPosition, allNodes, setAllNodes, isDrawing, setIsLineDialogOpen }) => {
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
                setIsLineDialogOpen={setIsLineDialogOpen}
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
    // const [lineLetters, setLineLetters] = useState([]);
    const [selectedSVG, setSelectedSVG] = useState(null);
    const [allNodes, setAllNodes] = useState([]);
    const [isLineDialogOpen, setIsLineDialogOpen] = useState(false);

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
        end: (item, monitor) => {
            setIsLineDialogOpen(true);
        }
    }));

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

    const calculateDoubleLineOffset = (start, end, offsetAmount) => {
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        return {
            offsetX: offsetAmount * Math.sin(angle),
            offsetY: -offsetAmount * Math.cos(angle),
        };
    }

    const handleSave = (color, leftText, rightText, type) => {
        console.log(color, leftText, rightText);
        setLines(prev => {
            const lines = [...prev];
            const lastLineIndex = lines.length - 1;
            if (lastLineIndex >= 0) {
                lines[lastLineIndex].color = color;
                console.log(lines[lastLineIndex].color);
                lines[lastLineIndex].leftText = leftText;
                lines[lastLineIndex].rightText = rightText;
                lines[lastLineIndex].type = type;
            }
            return lines;
        });
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
                    setIsLineDialogOpen={setIsLineDialogOpen}
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
                    const angle = Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * 180 / Math.PI;
                    const offsetX = 15 * Math.sin(angle * Math.PI / 180);
                    const offsetY = 15 * Math.cos(angle * Math.PI / 180);
                    const doubleLineOffset = calculateDoubleLineOffset(line.start, line.end, 5); // 5 is the offset amount
                    return (
                        <React.Fragment key={index}>
                            <text
                                x={midpoint.x - offsetX}
                                y={midpoint.y + offsetY}
                                fontFamily="Arial"
                                fontSize="14"
                                fill="black"
                            >
                                {line.leftText}
                            </text>
                            <text
                                x={midpoint.x + offsetX}
                                y={midpoint.y - offsetY}
                                fontFamily="Arial"
                                fontSize="14"
                                fill="black"
                            >
                                {line.rightText}
                            </text>
                            <LinePropertiesDialog
                                isOpen={isLineDialogOpen}
                                onClose={() => setIsLineDialogOpen(false)}
                                onSave={handleSave}
                            />
                            {line.type === 'single' ? (
                                <path
                                    d={`M${line.start.x},${line.start.y}Q${control.x},${control.y},${line.end.x},${line.end.y}`}
                                    stroke={line.color}
                                    fill="none"
                                    strokeWidth={2}
                                />
                            ) : (
                                <>
                                    {/* Use the offset for parallel lines */}
                                    <path
                                        d={`M${line.start.x - doubleLineOffset.offsetX},${line.start.y - doubleLineOffset.offsetY}Q${control.x - doubleLineOffset.offsetX},${control.y - doubleLineOffset.offsetY},${line.end.x - doubleLineOffset.offsetX},${line.end.y - doubleLineOffset.offsetY}`}
                                        stroke={line.color}
                                        fill="none"
                                        strokeWidth={2}
                                    />
                                    <path
                                        d={`M${line.start.x + doubleLineOffset.offsetX},${line.start.y + doubleLineOffset.offsetY}Q${control.x + doubleLineOffset.offsetX},${control.y + doubleLineOffset.offsetY},${line.end.x + doubleLineOffset.offsetX},${line.end.y + doubleLineOffset.offsetY}`}
                                        stroke={line.color}
                                        fill="none"
                                        strokeWidth={2}
                                    />
                                </>
                            )}
                        </React.Fragment>
                    );
                })}

            </svg>
        </Box>
    );
}

export default Canvas;
