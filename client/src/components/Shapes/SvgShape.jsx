import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { handleNodeMouseOut, handleNodeHover } from "../../utils/nodeUtilities";
import { calculateMidpoint } from "../Lines/ControlPoints";
import { v4 as uuidv4 } from "uuid";

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

        setLines((prev) => [...prev, newLine]);
        setIsDrawing(true);
        setStartPosition(adjustedPoint);
    }

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
