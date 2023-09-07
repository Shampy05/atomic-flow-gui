import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { handleNodeMouseOut, handleNodeHover } from "../../utils/nodeUtilities";
import { calculateMidpoint } from "../Lines/ControlPoints";
import { v4 as uuidv4 } from "uuid";

/**
 * This component is used to render a shape on the canvas. It is used by the Canvas
 * and Sidebar components. It is used to render a shape on the canvas, and to handle
 * the drag and drop functionality of the shape. It also handles the click
 * functionality of the shape, which is used to select the shape and to draw lines.
 * 
 * @param {object} props
 * @param {object} props.shapeObj - The SVG object to render.
 * @param {boolean} props.selected - Whether the SVG is selected.
 * @param {function} props.setIsDrawing - Function to set whether a shape is currently being drawn.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * @param {function} props.setLines - Function to set the lines on the canvas.
 * @param {function} props.setIsLineDrawn - Function to set whether a line is currently being drawn.
 * @param {boolean} props.isLineDrawn - Whether a line is currently being drawn.
 * @param {number} props.step - Grid step size.
 * @param {array} props.lines - Array of lines on the canvas.
 * @param {function} props.setStartPosition - Function to set the start position of the line.
 * @param {function} props.setIsLineDialogOpen - Function to set whether the line dialog is open.
 * @param {string} props.nodeId - The ID of the node.
 * @param {boolean} props.isSidebar - Whether the shape is being rendered on the sidebar.
 * @param {string} props.svgId - The ID of the SVG.
 * @param {array} props.allNodes - Array of all nodes on the canvas.
 * @param {function} props.setAllNodes - Function to set the nodes on the canvas.
 * @param {object} props.currentGridPosition - The grid position of the shape.
 * @param {object} props.canvasDimensions - The dimensions of the canvas.
 * 
 * @returns {JSX.Element} SVGShape
 */
const SVGShape = (props) => {
    const {
        shapeObj,
        selected,
        setIsDrawing,
        isDrawing,
        setLines,
        setIsLineDrawn,
        isLineDrawn,
        step,
        lines,
        setStartPosition,
        setIsLineDialogOpen,
        nodeId,
        isSidebar,
        svgId,
        allNodes,
        setAllNodes,
        currentGridPosition,
        canvasDimensions
    } = props;

    const ref = useRef();
    const nodeRadius = 3;

    /**
     * Adjust the point to account for the SVG being scaled to fit the canvas. This
     * is used to calculate the start and end points of the line.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {object} The adjusted point.
     */
    const adjustPoint = (event) => {
        const point = d3.pointer(event);
        const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
        const scaleX = svgRect.width / 50;
        const scaleY = svgRect.height / 50;

        return {
            x: point[0] * scaleX + svgRect.left,
            y: point[1] * scaleY + svgRect.top
        };
    }

    /**
     * Handle the mouse down event. This is used to draw a line on the canvas. It
     * is used to set the start position of the line, and to set the end position
     * of the line when the mouse is released.
     * 
     * @param {object} event - The event object.
     * @param {object} node - The node object.
     * 
     * @returns {void}
     */
    const handleMouseDown = async (event, node) => {
        event.stopPropagation();
        event.preventDefault();

        const adjustedPoint = adjustPoint(event);
        const lineMidpoint = calculateMidpoint(adjustedPoint, {
            x: adjustedPoint.x + 10,
            y: adjustedPoint.y + 10
        });

        const translatedX = lineMidpoint.x - (canvasDimensions.width / 2);
        const translatedY = lineMidpoint.y - (canvasDimensions.height / 2);

        const newLine = {
            id: uuidv4(),
            start: adjustedPoint,
            end: { x: adjustedPoint.x + 10, y: adjustedPoint.y + 10 },
            startNode: { ...node, type: event.target.getAttribute("data-type") },
            endNode: null,
            color: "black",
            type: "single",
            midpoint: lineMidpoint,
            gridCoordinates: {
                x: Math.round(translatedX / step),
                y: Math.round(-translatedY / step)
            }
        };
        console.warn("newLine", newLine);
        setLines((prev) => [...prev, newLine]);
        setIsDrawing(true);
        setStartPosition(adjustedPoint);
    }

    /**
     * Handle the mouse up event. This is used to set the end position of the line. It
     * is also used to open the line dialog.
     * 
     * @param {object} event - The event object.
     * 
     * @returns {void}
     */
    const handleMouseUp = (event) => {
        if (event.target.classList.contains("node")) {
            const endNode = {
                x: parseFloat(event.target.getAttribute("cx")),
                y: parseFloat(event.target.getAttribute("cy")),
                svgId,
                type: event.target.getAttribute("data-type"),
                nodeId: event.target.getAttribute("data-id")
            };

            setLines((prevLines) => {
                const updatedLine = { ...prevLines[prevLines.length - 1], endNode };
                return [...prevLines.slice(0, prevLines.length - 1), updatedLine];
            });
            setIsDrawing(false);
            setIsLineDialogOpen((prev) => !prev);
        }
    }

    /**
     * Draw the node on the canvas. This is used to draw the node of the shape on the 
     * canvas when the shape is rendered on the sidebar.
     * 
     * @param {Object} svgElement The SVG element.
     * 
     * @returns {void}
     */
    const drawNode = (svgElement) => {
        const newNodes = shapeObj.nodes.flatMap(({ x, y, type }, index) => {
            svgElement.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", nodeRadius)
                .attr("pointer-events", "auto")
                .attr("class", isDrawing ? "node active-drag" : "node")
                .attr("data-id", nodeId[index])
                .attr("data-type", type)
                .on("mousedown", (event) => handleMouseDown(event, { x, y, svgId, nodeId: nodeId[index] }))
                .on("mouseup", handleMouseUp)
                .on("mouseover", handleNodeHover)
                .on("mouseout", handleNodeMouseOut);

            return allNodes.some(existingNode => existingNode.id === nodeId[index]) ? [] : [{ id: nodeId[index], x, y, svgId }];
        });
        setAllNodes((prev) => [...prev, ...newNodes]);
    }

    /**
     * Draw the shape on the canvas. This is used to draw the shape on the canvas when
     * the shape is rendered on the sidebar.
     * 
     * @param {Object} svgElement The SVG element.
     * 
     * @returns {void}
     */
    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove();
        const element = shapeObj.draw(svgElement);
        if (!isSidebar) drawNode(svgElement);
        if (selected) element.attr('stroke', '#A584A5').attr('stroke-width', 2);
        return () => svgElement.selectAll("*").remove();
    }, [selected]);

    return <svg ref={ref} viewBox="0 0 50 50" width="100%" height="100%" />;
}

export default SVGShape;
