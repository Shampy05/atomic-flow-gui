import React, {useRef, useEffect, useState, useCallback} from "react";
import * as d3 from "d3";
import { calculateMidpoint } from "../Lines/ControlPoints";
import { v4 as uuidv4 } from "uuid";


const SVGShape =
    ({
                      shapeObj,
                      selected,
                      setIsDrawing,
                      isDrawing,
                      setLines,
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
    }) => {
    const ref = useRef();
    const nodeRadius = 3;



    function handleMouseDown(event, node) {
        event.stopPropagation();
        event.preventDefault(); // Prevent the default drag start event

        const nodeId = event.target.dataset.id;
        const step = 100;

        // Get the SVG coordinates of the mousedown event
        const point = d3.pointer(event);

        // Translate these to screen coordinates
        const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
        // This is the ratio between the actual size of the SVG in pixels, and the size of viewBox.
        const scaleX = svgRect.width / 50;
        const scaleY = svgRect.height / 50;

        // adjustLinePositions();

        const adjustedPoint = {
            x: node.x * scaleX + svgRect.left,
            y: node.y * scaleY + svgRect.top
        };

        const adjustedEnd = {
            x: adjustedPoint.x + 10,
            y: adjustedPoint.y + 10
        };

        const lineMidpoint = calculateMidpoint(adjustedPoint, adjustedEnd);

        // Convert the line's center to grid coordinates
        const centerX = canvasDimensions.width / 2;
        const centerY = canvasDimensions.height / 2;

        const translatedX = lineMidpoint.x - centerX;
        const translatedY = lineMidpoint.y - centerY;

        const gridX = translatedX / step;
        const gridY = -translatedY / step;

        const roundedGridX = Math.round(gridX);
        const roundedGridY = Math.round(gridY);

        const lineId = uuidv4();


        setIsDrawing(true);
        setStartPosition(adjustedPoint);
        setLines(prev => [
            ...prev,
            {
                id: lineId, // Add an id to identify the line
                start: adjustedPoint,
                end: adjustedEnd,
                startNode: { id: nodeId, x: node.x, y: node.y, svgId: node.svgId },
                endNode: null,
                color: "black",
                leftText: "",
                rightText: "",
                type: "single",
                midpoint: lineMidpoint,
                gridCoordinates: {x: roundedGridX, y: roundedGridY}
            }
        ]);
    }

    function handleMouseUp(event) {
        // adjustLinePositions()
        if(event.target.classList.contains("node")) {
            const releasedNodeData = {
                x: parseFloat(event.target.getAttribute("cx")),
                y: parseFloat(event.target.getAttribute("cy")),
                svgId: svgId,
                nodeId: event.target.getAttribute("data-id")
            };

            setLines(prevLines => {
                const lastLineIndex = prevLines.length - 1;
                const updatedLine = { ...prevLines[lastLineIndex], endNode: releasedNodeData };
                return [...prevLines.slice(0, lastLineIndex), updatedLine];
            });
            setIsDrawing(false);
            setIsLineDialogOpen((prev) => !prev);
        }
    }

    const addNodes = (index, x, y) => {
        let node = {id: nodeId[index], x, y, svgId};

        // Check if the node already exists based on its id
        if (!allNodes.some(existingNode => existingNode.id === node.id)) {
            return [node]; // Return as array for easy spread later
        }

        return []; // Return an empty array if node already exists
    }

    const handleNodeHover = (event) => {
        const targetNode = d3.select(event.target);
        // set pointer event to all
        targetNode.attr('pointer-events', 'all');
        if (isDrawing) {
            targetNode.attr('fill', 'red');  // Highlight node color when hovering over while drawing
        }
    }

    const handleNodeMouseout = (event) => {
        const targetNode = d3.select(event.target);
        if (isDrawing) {
            targetNode.attr('fill', 'blue');  // Revert to original color on mouseout
        }
    }

    const drawNode = (svgElement) => {
        let newNodes = []
        shapeObj.nodes.forEach(({x, y}, index) => {
            svgElement.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", nodeRadius)
                .attr("pointer-events", "auto")
                .attr("class", isDrawing ? "node active-drag" : "node")
                // .attr("visibility", selected ? "visible" : "hidden")
                .attr("data-id", nodeId[index])
                .on("mousedown", (event) => handleMouseDown(event, {x, y, svgId, nodeId: nodeId[index]}))
                .on("mouseup", (event) => handleMouseUp(event, {x, y, svgId, nodeId: nodeId[index]}))
                .on("mouseover", handleNodeHover)
                .on("mouseout", handleNodeMouseout)

            newNodes = [...newNodes, ...addNodes(index, x, y)];
        });
        setAllNodes(prev => [...prev, ...newNodes]);
    }

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove(); // clear all child elements

        const element = shapeObj.draw(svgElement);

        if (!isSidebar) {
            drawNode(svgElement)
            // Set the coordinates as attributes
            // TODO: Remove the currentGridPosition implementation
            element.attr("data-grid-x", currentGridPosition.x);
            element.attr("data-grid-y", currentGridPosition.y);
        }

        if (selected) {
            element.attr('stroke', '#A584A5');
            element.attr('stroke-width', 2);
        }

        // Clean up function to remove the drawn shape when the component unmounts or updates
        return () => svgElement.selectAll("*").remove();
    }, [selected]); // rerun effect when shapeObj, selected, or lines changes


    return (
        <>
            <svg
                ref={ref}
                viewBox="0 0 50 50"
                width="100%"
                height="100%"
            />
        </>
    );
}

export class Shape {
    constructor(attributes) {
        if (new.target === Shape) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.attributes = attributes;
    }

    draw(svgElement) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    get nodes() {
        throw new Error("Getter 'nodes' must be implemented.");
    }
}

export class Circle extends Shape {
    draw(svgElement) {
        return svgElement
            .append('circle')
            .attr('cx', this.attributes.cx)
            .attr('cy', this.attributes.cy)
            .attr('r', this.attributes.r)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    get nodes() {
        const top = { x: this.attributes.cx, y: this.attributes.cy - this.attributes.r };
        const bottom = { x: this.attributes.cx, y: this.attributes.cy + this.attributes.r };
        return [top, bottom];
    }
}

export class Path extends Shape {
    draw(svgElement) {
        return svgElement
            .append('path')
            .attr('d', this.attributes.d)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    get nodes() {
        const pathData = this.attributes.d.split(" ");
        const start = { x: parseFloat(pathData[1]), y: parseFloat(pathData[2]) };
        const control = { x: parseFloat(pathData[4]), y: parseFloat(pathData[5]) };
        const end = { x: parseFloat(pathData[6]), y: parseFloat(pathData[7]) };
        return [start, end];
    }
}

export class Polygon extends Shape {
    draw(svgElement) {
        return svgElement
            .append('polygon')
            .attr('points', this.attributes.points)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    get nodes() {
        const points = this.attributes.points.split(" ");
        return points.map(point => {
            const [x, y] = point.split(",");
            return { x: parseFloat(x), y: parseFloat(y) };
        });
    }
}

export default SVGShape;