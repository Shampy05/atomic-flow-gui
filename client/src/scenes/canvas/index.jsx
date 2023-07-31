import React, {useEffect, useRef, useState} from 'react';
import { Box } from "@mui/material";
import {useDrag, useDrop} from "react-dnd";
import * as d3 from "d3";

const DraggableSVGOnCanvas = ({ SVG, select, selected, setIsDrawing, setStartPosition, setLines, lines, svgPosition }) => {
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
        })
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
                    zIndex: 1
                }}
        >
            <SVG.component
                selected={selected || isDragging}
                setIsDrawing={setIsDrawing}
                setLines={setLines}
                lines={lines}
                setStartPosition={setStartPosition}
                setIsNodeClicked={setIsNodeClicked}
                svgPosition={svgPosition}
                svgId={SVG.id}
                nodeId={SVG.nodes.map(node => node.id)}
            />
        </div>
    );
};

const Canvas = ({ addSVG, SVGs, setSVGs }) => {
    const svgRef = useRef();
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPosition, setStartPosition] = useState({x: 0, y: 0});
    const [connections, setConnections] = useState([]);

    const [selectedSVG, setSelectedSVG] = useState(null);

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

            console.log("Canvas.jsx -> position: ", position);

            if (item.onCanvas) {
                setSVGs(prev => prev.map(svg =>
                    svg.id === item.id
                        ? {...svg, position: position}
                        : svg
                ));

                setLines(prev => prev.map(line => {
                    console.log("line", line);
                    console.log("line.svgId", line.svgId);
                    console.log("item.id", item.id);

                    if (line.node.svgId === item.id) {
                        console.log("nodeId matches item.id");
                        console.log("line.node", line.node);
                        return {
                            ...line,
                            // make sure the line is connected to the node that was dropped
                            start: {
                                x: position.x + line.node.x,
                                y: position.y + line.node.y
                            }
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
            console.log("Target element does not have 'node' class"); // Check if condition is causing function to exit
            return;
        }

        console.log("Target element has 'node' class"); // Check if condition is causing function to exit

        setIsDrawing(true);
        const point = d3.pointer(event);
        const nodeId = event.target.getAttribute('data-id');
        console.log("Canvas.jsx -> nodeId: ", nodeId);
        setStartPosition({x: point[0], y: point[1]});
        // setLines(prev => [
        //     ...prev,
        //     {
        //         start: {x: point[0], y: point[1]},
        //         end: {x: point[0], y: point[1]},
        //         nodeId: nodeId
        //     }]);
        console.log("Lines in handleMouseDown", lines);
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
        if (!event.target.classList.contains('node')) return;
        const nodeId = event.target.getAttribute('data-id');
        const lastLine = lines[lines.length - 1];
        setConnections(prev => [
            ...prev,
            {
                start: lastLine.start,
                end: lastLine.end,
            }
            ]);
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
                background: "pink"
            }}
        >
            {SVGs.map((SVG, index) => (
                <DraggableSVGOnCanvas
                    SVG={SVG}
                    selected={selectedSVG === SVG.id}
                    select={selectSVG}
                    setIsDrawing={setIsDrawing}
                    setLines={setLines}
                    lines={lines}
                    setStartPosition={setStartPosition}
                    svgPosition={SVG.position}
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
                    return (
                        <path
                            key={index}
                            d={`M${line.start.x},${line.start.y}Q${control.x},${control.y},${line.end.x},${line.end.y}`}
                            stroke="black"
                            fill="none"
                            strokeWidth={2}
                        />
                    );
                })}

            </svg>
        </Box>
    );
}

export default Canvas;
