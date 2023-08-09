import React, {useRef, useEffect, useState, useCallback} from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const SVGShape = ({ shapeObj, selected, setIsDrawing, isDrawing, setLines, lines, setStartPosition, setIsNodeClicked, svgPosition, setIsLineDialogOpen, nodeId, isSidebar, svgId, allNodes, setAllNodes }) => {
    const ref = useRef();
    const nodeRadius = 3;



    function handleMouseDown(event, node) {
        event.stopPropagation();
        event.preventDefault(); // Prevent the default drag start event

        const nodeId = event.target.dataset.id;

        // Get the SVG coordinates of the mousedown event
        const point = d3.pointer(event);

        // Translate these to screen coordinates
        const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
        // This is the ratio between the actual size of the SVG in pixels, and the size of viewBox.
        const scaleX = svgRect.width / 50;
        console.log("scaleX", scaleX)
        const scaleY = svgRect.height / 50;
        console.log("scaleY", scaleY)

        // adjustLinePositions();

        const adjustedPoint = {
            x: node.x * scaleX + svgRect.left,
            y: node.y * scaleY + svgRect.top
        };

        const adjustedEnd = {
            x: adjustedPoint.x + 10,
            y: adjustedPoint.y + 10
        };

        const lineId = `line-${node.nodeId}`;


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
            }
        ]);
    }

    function handleMouseUp(event, node, svgElement) {
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
        console.log("lines", lines)

    }

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove(); // clear all child elements

        const element = shapeObj.draw(svgElement);

        if (!isSidebar) {
            drawNode(svgElement)
        }

        if (selected) {
            element.attr('stroke', '#A584A5');
            element.attr('stroke-width', 2);
        }


        // Clean up function to remove the drawn shape when the component unmounts or updates
        return () => svgElement.selectAll("*").remove();
    }, [selected]); // rerun effect when shapeObj, selected, or lines changes


    return (
        <Box>
            <svg ref={ref} viewBox="0 0 50 50"/>
        </Box>
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