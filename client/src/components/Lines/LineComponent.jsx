import { calculateMidpoint, calculateControlPoint, calculateDoubleLineOffset, calculateLineGridCoordinates } from "./ControlPoints";
import LinePropertiesDialog from "./LinePropertiesDialog";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

/**
 * Component representing a draggable line with control points and handles to adjust the curve
 * 
 * @param {Object} props
 * @param {Array} props.lines - Array of line objects
 * @param {Boolean} props.isLineDialogOpen - Boolean to indicate if the line properties dialog is open
 * @param {Function} props.setIsLineDialogOpen - Function to set the isLineDialogOpen state
 * @param {Function} props.setLines - Function to set the lines state
 * @param {Object} props.canvasDimensions - Object containing the width and height of the canvas
 * 
 * @returns {React.Component}
 */
export const Line = ({ lines, isLineDialogOpen, setIsLineDialogOpen, setLines, canvasDimensions}) => {
    const svgRef = useRef(null);
    const [controlPoints, setControlPoints] = useState({});

    /**
     * Function to handle saving the line properties
     * 
     * @param {String} color - Color of the line
     * @param {String} leftText - Text to display on the left side of the line
     * @param {String} rightText - Text to display on the right side of the line
     * @param {String} type - Type of line (single or double)
     *
     * @returns {void}
     */
    const handleSave = (color, leftText, rightText, type) => {
        setLines(prev => prev.map((line, index) => index === prev.length - 1 ? { ...line, color, leftText, rightText, type } : line));
    }

    /**
     * Function to attach drag behavior to the control points and handles
     * 
     * @returns {void}
     */
    const attachDragBehavior = () => {
        const drag = d3.drag().on("drag", function (event) { handleDrag(event, this) });
        d3.selectAll("circle").call(drag);
    };

    /**
     * Function to handle dragging of the control points and handles
     * 
     * @param {Object} event - D3 drag event
     * @param {Object} element - D3 element being dragged
     * 
     * @returns {void}
     */
    const handleDrag = async (event, element) => {
        const circle = d3.select(element);
        const id = circle.attr("data-id");
        const type = circle.attr("data-type");
        const newX = +circle.attr("cx") + event.dx;
        const newY = +circle.attr("cy") + event.dy;

        let updates;
        if (type === "control") {
            updates = { [id]: { ...controlPoints[id], x: newX, y: newY } };
        } else if (["handle1", "handle2"].includes(type)) {
            updates = { [id]: { ...controlPoints[id], [type]: { x: newX, y: newY } } };
        }

        if (updates) {
            await setControlPoints(prev => ({ ...prev, ...updates }));
            updateBezier();
            circle.attr("cx", newX).attr("cy", newY);
        }
    };

    /**
     * Function to calculate the distance between a point and a line
     * 
     * @param {Object} point - Point object containing x and y coordinates
     * @param {Object} lineStart - Point object containing x and y coordinates of the start of the line
     * @param {Object} lineEnd - Point object containing x and y coordinates of the end of the line
     * 
     * @returns {Number} - Distance between the point and the line
     */
    const distanceFromLine = (point, lineStart, lineEnd) => {
        const { x: x1, y: y1 } = lineStart;
        const { x: x2, y: y2 } = lineEnd;
        const { x, y } = point;

        return Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) /
            Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    };

    /**
     * Function to check if a line is straight
     * 
     * @param {Object} line - Line object
     * @param {Number} threshold - Threshold to determine if a line is straight
     * 
     * @returns {Boolean} - Boolean indicating if the line is straight
     */
    const isStraightLine = (line, threshold = 5) => {  // default threshold of 5 units
        const control = controlPoints[line.id] || calculateControlPoint(line.start, line.end);
        const distance = distanceFromLine(control, line.start, line.end);

        return distance <= threshold;
    };

    /**
     * Function to check if a line is bulging left or right
     * 
     * @param {Object} start - Point object containing x and y coordinates of the start of the line
     * @param {Object} end - Point object containing x and y coordinates of the end of the line
     * @param {Object} control - Point object containing x and y coordinates of the control point
     * 
     * @returns {Boolean} - Boolean indicating if the line is bulging left or right
     */
    const isLineBulgingLeft = (start, end, control) => {
        return control.x < start.x && control.x < end.x;
    };

    /**
     * Function to check if a line is bulging left or right
     * 
     * @param {Object} start - Point object containing x and y coordinates of the start of the line
     * @param {Object} end - Point object containing x and y coordinates of the end of the line
     * @param {Object} control - Point object containing x and y coordinates of the control point
     * 
     * @returns {Boolean} - Boolean indicating if the line is bulging left or right
     */
    const isLineBulgingRight = (start, end, control) => {
        return control.x > start.x && control.x > end.x;
    };

    /**
     * Function to calculate the signed area of a triangle. Used to determine if a line is an S-curve. 
     * 
     * @param {Object} p1 - Point object containing x and y coordinates of the first point
     * @param {Object} p2 - Point object containing x and y coordinates of the second point
     * @param {Object} p3 - Point object containing x and y coordinates of the third point
     * 
     * @returns {Number} - Signed area of the triangle
     */
    const signedArea = (p1, p2, p3) => {
        return (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
    };

    /**
     * Function to calculate the distance between two points. 
     * 
     * @param {Object} p1 - Point object containing x and y coordinates of the first point
     * @param {Object} p2 - Point object containing x and y coordinates of the second point
     * 
     * @returns {Number} - Distance between the two points
     */
    const distance = (p1, p2) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };

    /**
     * Function to check if a line is an S-curve. If one control point is closer to the start and the other is closer to the end
     * and they have opposite signed areas (heights), then the line is an S-curve.
     * 
     * @param {Object} start - Point object containing x and y coordinates of the start of the line
     * @param {Object} end - Point object containing x and y coordinates of the end of the line
     * @param {Object} handle1 - Point object containing x and y coordinates of the first control point
     * @param {Object} handle2 - Point object containing x and y coordinates of the second control point
     * 
     * @returns {Boolean} - Boolean indicating if the line is an S-curve
     */
    const isSCurve = (start, end, handle1, handle2) => {
        const area1 = signedArea(start, end, handle1);
        const area2 = signedArea(start, end, handle2);

        const distanceStartToHandle1 = distance(start, handle1);
        const distanceStartToHandle2 = distance(start, handle2);

        return (
            ((distanceStartToHandle1 < distanceStartToHandle2) && (area1 > 0 && area2 < 0)) ||
            ((distanceStartToHandle2 < distanceStartToHandle1) && (area2 > 0 && area1 < 0))
        );
    };

    const isInvertedSCurve = (start, end, handle1, handle2) => {
        return !isSCurve(start, end, handle1, handle2);
    };


    /**
     * Function to update the bezier curve of a line. If no control points are passed in, the control points will be calculated.
     * 
     * @param {Object} updatedControlPoints - Object containing the control points for each line
     * 
     * @returns {void}
     */
    const updateBezier = (updatedControlPoints = controlPoints) => {
        lines.forEach(line => {
            let control = updatedControlPoints[line.id];
            if (!control) {
                control = calculateControlPoint(line.start, line.end);
                updatedControlPoints[line.id] = control;
            }

            line.midpoint = calculateMidpoint(line.start, line.end);
            if (isStraightLine(line)) {
                line.curvature = "straight";
            } else if (control.handle1 && control.handle2 && isSCurve(line.start, line.end, control.handle1, control.handle2)) {
                line.curvature = "s-curve";
            } else if (control.handle1 && control.handle2 && isInvertedSCurve(line.start, line.end, control.handle1, control.handle2)) {
                line.curvature = "inverted-s-curve";
            } else if (isLineBulgingLeft(line.start, line.end, control)) {
                line.curvature = "left-bulge";
            } else if (isLineBulgingRight(line.start, line.end, control)) {
                line.curvature = "right-bulge";
            } else {
                line.curvature = "curved";
            }

            updatePath(line, control);
        });
    }

    /**
     * Function to update the path of a line. If the line is a double line, two paths will be updated.
     * 
     * @param {Object} line - Line object
     * @param {Object} control - Control point object
     * 
     * @returns {void}
     */
    const updatePath = (line, control) => {
        if (line.type === 'single'  && control.handle1 && control.handle2) {
            d3.select(`#path-${line.id}`)
                .attr("d", `M${line.start.x},${line.start.y}C${control.handle1.x},${control.handle1.y},${control.handle2.x},${control.handle2.y},${line.end.x},${line.end.y}`);
        } else {
            const doubleLineOffset = calculateDoubleLineOffset(line.start, line.end, 5);
            d3.select(`#path-${line.id}-1`)
                .attr("d", getPathWithOffset(line, control, -doubleLineOffset.offsetX, -doubleLineOffset.offsetY));
            d3.select(`#path-${line.id}-2`)
                .attr("d", getPathWithOffset(line, control, doubleLineOffset.offsetX, doubleLineOffset.offsetY));
        }
    }

    /**
     * Function to get the path of a line with an offset. Used for double lines.
     * 
     * @param {Object} line - Line object
     * @param {Object} control - Control point object
     * @param {Number} offsetX - X offset
     * @param {Number} offsetY - Y offset
     * 
     * @returns {String} - Path of the line with the offset
     */
    const getPathWithOffset = (line, control, offsetX, offsetY) => {
        return `M${line.start.x + offsetX},${line.start.y + offsetY}Q${control.x + offsetX},${control.y + offsetY},${line.end.x + offsetX},${line.end.y + offsetY}`;
    }

    /**
     * Function to update the control points and handles when the lines change
     * 
     * @returns {void}
     */
    useEffect(() => {
        attachDragBehavior();
    }, [lines, controlPoints]);


    /**
     * Function to initialize the control points when the component mounts
     * 
     * @returns {void}
     */
    useEffect(() => {
        initializeControlPoints();
    }, []);

    /**
     * Function to initialize the control points for each line. If the control point does not exist, it will be calculated.
     * 
     * @returns {void}
     */
    const initializeControlPoints = () => {
        const newControlPoints = { ...controlPoints };
        lines.forEach(line => {
            if (!controlPoints[line.id]) {
                let control = calculateControlPoint(line.start, line.end);

                // Check for top-left and top-right data-types and adjust control points
                if (line.startNode['data-type'] === "top-left" || line.start['data-type'] === "top-right") {
                    control.x += (control.x - line.start.x) * 2;
                    control.y += (control.y - line.start.y) * 2;
                }

                const handle1 = { x: control.x - 40, y: control.y - 40 };
                const handle2 = { x: control.x + 40, y: control.y + 40 };
                newControlPoints[line.id] = { ...control, handle1, handle2 };  // initialize with handle1 and handle2
            }
        });
        setControlPoints(newControlPoints);
        updateBezier(newControlPoints);
    }


    /**
     * Function to update the bezier curves when the control points change. 
     * 
     * @returns {void}
     */
    useEffect(() => {
        updateBezier();
    }, [controlPoints]);

    return (
        <svg ref={svgRef} width="100%" height="100%">
            {lines.map((line, index) => {
                if (isStraightLine(line)) {
                    line.curvature = "straight";
                } else {
                    line.curvature = "curved";
                }
                line.gridCoordinates = calculateLineGridCoordinates(line, canvasDimensions);
                console.warn("line.gridCoordinates", line.gridCoordinates)
                return (
                    <LineFragment
                        key={index}
                        line={line}
                        controlPoints={controlPoints}
                        isLineDialogOpen={isLineDialogOpen}
                        setIsLineDialogOpen={setIsLineDialogOpen}
                        handleSave={handleSave}
                    />
                )
            })}
        </svg>
    );
};

/**
 * Component representing a line with control points and handles to adjust the curve.
 * This component is used to render the line and the control points and handles.
 * 
 * @param {Object} props
 * @param {Object} props.line - Line object
 * @param {Object} props.controlPoints - Object containing the control points for each line
 * @param {Boolean} props.isLineDialogOpen - Boolean to indicate if the line properties dialog is open
 * @param {Function} props.setIsLineDialogOpen - Function to set the isLineDialogOpen state
 * @param {Function} props.handleSave - Function to handle saving the line properties
 * 
 * @returns {React.Component}
 */
const LineFragment = ({ line, controlPoints, isLineDialogOpen, setIsLineDialogOpen, handleSave }) => {
    let control = controlPoints[line.id];
    if (!control) {
        control = calculateControlPoint(line.start, line.end);
    }
    const { handle1 = { x: control.x + 40, y: control.y + 40 }, handle2 = { x: control.x - 40, y: control.y - 40 } } = control;
    const midpoint = calculateMidpoint(line.start, line.end);
    const angle = Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * 180 / Math.PI;
    const offsetX = 15 * Math.sin(angle * Math.PI / 180);
    const offsetY = 15 * Math.cos(angle * Math.PI / 180);
    const doubleLineOffset = calculateDoubleLineOffset(line.start, line.end, 5);

    return (
        <React.Fragment>
            <circle
                cx={control.x}
                cy={control.y}
                r={5}
                fill="red"
                cursor="pointer"
                data-id={line.id}
                data-type="control"
            />
            <circle
                cx={handle1.x || control.x + 40}
                cy={handle1.y || control.y + 40}
                r={3}
                fill="pink"
                cursor="pointer"
                data-id={line.id}
                data-type="handle1"
            />
            <circle
                cx={handle2.x || control.x - 40}
                cy={handle2.y || control.y - 40}
                r={3}
                fill="green"
                cursor="pointer"
                data-id={line.id}
                data-type="handle2"
            />

            <line x1={control.x} y1={control.y} x2={handle1.x} y2={handle1.y} stroke="grey" />
            <line x1={control.x} y1={control.y} x2={handle2.x} y2={handle2.y} stroke="grey" />

            <text x={midpoint.x - offsetX} y={midpoint.y + offsetY} fontFamily="Arial" fontSize="14" fill="black">
                {line.leftText}
            </text>
            <text x={midpoint.x + offsetX} y={midpoint.y - offsetY} fontFamily="Arial" fontSize="14" fill="black">
                {line.rightText}
            </text>
            <LinePropertiesDialog
                isOpen={isLineDialogOpen}
                onClose={() => setIsLineDialogOpen(false)}
                onSave={handleSave}
            />
            {line.type === 'single' ? (
                <path
                    id={`path-${line.id}`}
                    d={`M${line.start.x},${line.start.y}Q${control.x},${control.y},${line.end.x},${line.end.y}`}
                    stroke={line.color}
                    fill="none"
                    strokeWidth={2}
                />
            ) : (
                <>
                    <path
                        id={`path-${line.id}-1`}
                        d={`M${line.start.x - doubleLineOffset.offsetX},${line.start.y - doubleLineOffset.offsetY}Q${control.x - doubleLineOffset.offsetX},${control.y - doubleLineOffset.offsetY},${line.end.x - doubleLineOffset.offsetX},${line.end.y - doubleLineOffset.offsetY}`}
                        stroke={line.color}
                        fill="none"
                        strokeWidth={2}
                    />
                    <path
                        id={`path-${line.id}-2`}
                        d={`M${line.start.x + doubleLineOffset.offsetX},${line.start.y + doubleLineOffset.offsetY}Q${control.x + doubleLineOffset.offsetX},${control.y + doubleLineOffset.offsetY},${line.end.x + doubleLineOffset.offsetX},${line.end.y + doubleLineOffset.offsetY}`}
                        stroke={line.color}
                        fill="none"
                        strokeWidth={2}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default Line;
