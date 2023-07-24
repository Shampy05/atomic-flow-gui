import React, {useRef, useState} from 'react';
import { Box } from "@mui/material";
import {useDrag, useDrop} from "react-dnd";
import * as d3 from "d3";

const DraggableSVGOnCanvas = ({ SVG, select, selected, setIsDrawing, setStartPosition, setLines, svgPosition }) => {
    const [isNodeClicked, setIsNodeClicked] = useState(false);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: "svg",
        item: () => {
            console.log("Id: ", SVG.id);
            return {
                id: SVG.id,
                onCanvas: true
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
                    zIndex: 1
                }}
        >
            <SVG.component
                selected={selected || isDragging}
                setIsDrawing={setIsDrawing}
                setLines={setLines}
                setStartPosition={setStartPosition}
                setIsNodeClicked={setIsNodeClicked}
                svgPosition={svgPosition}
            />
        </div>
    );
};

const Canvas = ({ addSVG, SVGs, setSVGs }) => {
    const svgRef = useRef();
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPosition, setStartPosition] = useState({x: 0, y: 0});

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

            if (item.onCanvas) {
                setSVGs(prev => prev.map(svg =>
                    svg.id === item.id
                        ? {...svg, position: position}
                        : svg
                ));
            } else {
                addSVG(item.id, position);
            }
        },
    }));

    const handleMouseDown = (event) => {
        setIsDrawing(true);
        const point = d3.pointer(event);
        setStartPosition({x: point[0], y: point[1]});
        setLines(prev => [
            ...prev,
            {
                start: {x: point[0], y: point[1]},
                end: {x: point[0], y: point[1]}
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
                    start: startPosition,
                    end: {x: point[0], y: point[1]}
                };
            } else {
                lines.push({
                    start: startPosition,
                    end: {x: point[0], y: point[1]}
                });
            }

            return lines;
        });
    }

    const handleMouseUp = (event) => {
        setIsDrawing(false);
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
                {lines.map((line, index) => (
                    <line
                        key={index}
                        x1={line.start.x}
                        y1={line.start.y}
                        x2={line.end.x}
                        y2={line.end.y}
                        stroke="black"
                        strokeWidth={2}
                    />
                ))}
            </svg>
        </Box>
    );
}

export default Canvas;
