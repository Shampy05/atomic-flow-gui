import { calculateMidpoint, calculateControlPoint, calculateDoubleLineOffset } from "./ControlPoints";
import LinePropertiesDialog from "./LinePropertiesDialog";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


export const Line = ({ lines, isLineDialogOpen, setIsLineDialogOpen, setLines }) => {
    const svgRef = useRef(null);
    const [controlPoints, setControlPoints] = useState({});

    const handleSave = (color, leftText, rightText, type) => {
        setLines(prev => {
            const updatedLines = [...prev];
            const lastLineIndex = updatedLines.length - 1;
            if (lastLineIndex >= 0) {
                const lastLine = updatedLines[lastLineIndex];
                Object.assign(lastLine, { color, leftText, rightText, type });
            }
            return updatedLines;
        });
    }

    const updateControlPoints = (updates, callback) => {
        setControlPoints(prev => {
            const newState = { ...prev, ...updates };
            callback && callback(newState);
            return newState;
        });
    };

    const attachDragBehavior = () => {
        const drag = d3.drag()
            .on("drag", function (event) {
                handleDrag(event, this);
            });

        d3.selectAll("circle").call(drag);
    }

    const handleDrag = (event, element) => {
        const circle = d3.select(element);
        const id = circle.attr("data-id");
        const type = circle.attr("data-type");
        const newX = +circle.attr("cx") + event.dx;
        const newY = +circle.attr("cy") + event.dy;


        const updates = {};
        if (type === "control") {
            updates[id] = {
                ...controlPoints[id],
                x: newX,
                y: newY
            };
        } else if (type === "handle1") {
            updates[id] = {
                ...controlPoints[id],
                handle1: { x: newX, y: newY }
            };
        } else if (type === "handle2") {
            updates[id] = {
                ...controlPoints[id],
                handle2: { x: newX, y: newY }
            };
        }

        updateControlPoints(updates, () => {
            updateBezier();
        });

        circle.attr("cx", newX).attr("cy", newY);

    }

    const isStraightLine = (line, threshold = 5) => {
        const { start, end } = line;
        console.log("start", start)
        console.log("end", end)
        console.log("midpoint property", line.midpoint)
        console.log("midpoint function", calculateMidpoint(start, end))

        // Check if the line is vertical upto a threshold
        if (Math.abs(start.x - end.x) <= threshold) {
            return true;
        }
        return false;
    };

    const isLineConcave = (line, threshold = 5) => {
        const { start, end } = line;

        const midpoint = calculateMidpoint(start, end);
        const isMidpointLeftOfStart = midpoint.x < start.x;
        const isMidpointLeftOfEnd = midpoint.x < end.x;
        const isMidpointRightOfStart = midpoint.x > start.x;
        const isMidpointRightOfEnd = midpoint.x > end.x;

        // TODO: Change midpoint on moving the bezier control points
        return (isMidpointLeftOfStart && isMidpointLeftOfEnd)
            || (isMidpointRightOfStart && isMidpointRightOfEnd);
    }


    const updateBezier = (updatedControlPoints = controlPoints) => {
        lines.forEach(line => {
            let control = updatedControlPoints[line.id];
            if (!control) {
                control = calculateControlPoint(line.start, line.end);
                updatedControlPoints[line.id] = control;
            }

            updatePath(line, control);
        });
    }


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

    const getPathWithOffset = (line, control, offsetX, offsetY) => {
        return `M${line.start.x + offsetX},${line.start.y + offsetY}Q${control.x + offsetX},${control.y + offsetY},${line.end.x + offsetX},${line.end.y + offsetY}`;
    }

    useEffect(() => {
        attachDragBehavior();
    }, [lines, controlPoints]);


    useEffect(() => {
        initializeControlPoints();
    }, []);

    const initializeControlPoints = () => {
        const newControlPoints = { ...controlPoints };
        lines.forEach(line => {
            if (!controlPoints[line.id]) {
                const control = calculateControlPoint(line.start, line.end);
                const handle1 = { x: control.x - 40, y: control.y - 40 };
                const handle2 = { x: control.x + 40, y: control.y + 40 };
                newControlPoints[line.id] = { ...control, handle1, handle2 };
            }
        });
        setControlPoints(newControlPoints);
        updateBezier(newControlPoints);
    }


    useEffect(() => {
        updateBezier();
    }, [controlPoints]);

    return (
        <svg ref={svgRef} width="100%" height="100%">
            {lines.map((line, index) => {
                if (isStraightLine(line)) {
                    line.curvature = "straight";
                } else if (isLineConcave(line)) {
                    line.curvature = "concave";
                } else {
                    line.curvature = "convex";
                }
                console.log("line.curvature", line.curvature)
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