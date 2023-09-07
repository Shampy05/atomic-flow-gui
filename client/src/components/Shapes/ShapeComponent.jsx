import React, {useEffect, useState} from "react";
import {useDrag} from "react-dnd";

/**
 * Component for rendering a shape on the canvas. This component is used by the
 * Canvas component. It is used to render a shape on the canvas, and to handle
 * the drag and drop functionality of the shape. It also handles the click
 * functionality of the shape, which is used to select the shape.
 * 
 * @param {object} props
 * @param {object} props.SVG - The SVG object to render.
 * @param {function} props.select - Function to select the SVG.
 * @param {boolean} props.selected - Whether the SVG is selected.
 * @param {number} props.step - Grid step size.
 * @param {boolean} props.isLineDrawn - Whether a line is currently being drawn.
 * @param {function} props.setIsLineDrawn - Function to set whether a line is currently being drawn.
 * @param {function} props.setIsDrawing - Function to set whether a shape is currently being drawn.
 * @param {function} props.setStartPosition - Function to set the start position of the line.
 * @param {function} props.setLines - Function to set the lines on the canvas.
 * @param {array} props.lines - Array of lines on the canvas.
 * @param {array} props.allNodes - Array of all nodes on the canvas.
 * @param {function} props.setSVGs - Function to set the SVGs on the canvas.
 * @param {function} props.setAllNodes - Function to set the nodes on the canvas.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * @param {function} props.setIsLineDialogOpen - Function to set whether the line dialog is open.
 * @param {object} props.gridPosition - The grid position of the shape.
 * @param {object} props.canvasDimensions - The dimensions of the canvas.
 * 
 * @returns {JSX.Element} ShapeComponent
 */
const ShapeComponent = ({ SVG, select, selected, step, isLineDrawn, setIsLineDrawn, setIsDrawing, setStartPosition, setLines, lines, allNodes, setSVGs, setAllNodes, isDrawing, setIsLineDialogOpen, gridPosition, canvasDimensions }) => {
    const [isNodeClicked, setIsNodeClicked] = useState(false);
    const [currentGridPosition, setCurrentGridPosition] = useState(SVG.gridCoordinates)

    /**
     * Update the current grid position when the grid position changes. This is
     * used to determine whether the SVG should be updated. If the grid position
     * has changed, then the SVG should be updated.
     * 
     * @returns {void}
     */
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

    /**
     * React DnD hook for handling the drag and drop functionality of the shape. This
     * hook is used to handle the drag and drop functionality of the shape. It is used
     * to set the type of the item being dragged, and to set the item being dragged.
     * 
     * @returns {void}
     */
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

    /**
     * Callback for when the SVG is clicked. This callback is used to select the SVG
     * when it is clicked. It is also used to set the isNodeClicked state to false,
     * which is used to determine whether the SVG can be dragged.
     * 
     * @param {Object} e - The click event.
     * 
     * @returns {void}
     */
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
