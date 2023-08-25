import React, {useEffect, useState} from "react";
import {useDrag} from "react-dnd";

const ShapeComponent = ({ SVG, select, selected, step, isLineDrawn, setIsLineDrawn, setIsDrawing, setStartPosition, setLines, lines, allNodes, setSVGs, setAllNodes, isDrawing, setIsLineDialogOpen, gridPosition, canvasDimensions }) => {
    const [isNodeClicked, setIsNodeClicked] = useState(false);
    const [currentGridPosition, setCurrentGridPosition] = useState(SVG.gridCoordinates)


    useEffect(() => {
        setSVGs(prevSVGs => {
            const updatedSVG = prevSVGs.find(svg => svg.id === SVG.id);
            // Only update the SVG if the grid position has changed.
            if (updatedSVG && (updatedSVG.gridCoordinates.x !== gridPosition.x || updatedSVG.gridCoordinates.y !== gridPosition.y)) {
                return prevSVGs.map(svg => {
                    if (svg.id === SVG.id) {
                        return {...svg, gridCoordinates: gridPosition};
                    }
                    return svg;
                });
            }
            // If no change, just return the previous state to avoid unnecessary re-renders.
            return prevSVGs;
        });
    }, [gridPosition]);

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
            style={{
                    opacity:
                        isDragging
                            ? 0
                            : 1,
                    position: "absolute",
                    left: SVG.position.x,
                    top: SVG.position.y,
                    width: "7rem",
                    zIndex: 1,
                    pointerEvents: ( isDrawing ) ? "none" : "auto",
                }}
        >
            <SVG.component
                selected={selected || isDragging}
                setIsDrawing={setIsDrawing}
                canvasDimensions={canvasDimensions}
                isDrawing={isDrawing}
                setLines={setLines}
                lines={lines}
                step={step}
                isLineDrawn={isLineDrawn}
                setIsLineDrawn={setIsLineDrawn}
                setSVGs={setSVGs}
                setStartPosition={setStartPosition}
                currentGridPosition={currentGridPosition}
                setIsLineDialogOpen={setIsLineDialogOpen}
                svgId={SVG.id}
                nodeId={SVG.nodes.map(node => node.id)}
                allNodes={allNodes}
                setAllNodes={setAllNodes}
            />
        </div>
    );
};

export default ShapeComponent;
