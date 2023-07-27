import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const SVGShape = ({ shapeObj, selected, setIsDrawing, setLines, setStartPosition, setIsNodeClicked, svgPosition }) => {
    const ref = useRef();
    const nodeRadius = 3; // radius of the nodes

    function handleMousedown(event, node) {
        event.stopPropagation();
        event.preventDefault(); // Prevent the default drag start event

        const nodeId = event.target.dataset.id;

        // Get the SVG coordinates of the mousedown event
        const point = d3.pointer(event);

        // Translate these to screen coordinates
        const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
        // This is the ratio between the actual size of the SVG in pixels, and the size of viewBox.
        const scaleX = svgRect.width / 50;
        const scaleY = svgRect.height / 50;

        const adjustedPoint = {
            x: node.x * scaleX + svgRect.left,
            y: node.y * scaleY + svgRect.top
        };

        setIsDrawing(true);
        setStartPosition(adjustedPoint);
        setLines(prev => [
            ...prev,
            {
                start: adjustedPoint,
                end: adjustedPoint,
                node: { id: nodeId, x: node.x, y: node.y, svgId: node.svgId } // Include the node id here
            }
        ]);
    }

    function handleMouseup(event, node) {
        const point = d3.pointer(event);
        const svgRect = event.target.ownerSVGElement.getBoundingClientRect();
        const scaleX = svgRect.width / 50;
        const scaleY = svgRect.height / 50;

        const currentPoint = {
            x: point[0] * scaleX + svgRect.left,
            y: point[1] * scaleY + svgRect.top
        };

        // Use currentPoint where you need the position of the mouse at the moment of the mouseup event
        setIsDrawing(false);

        setLines(prev => prev.map(line => {
            if (line.start === currentPoint) {
                return { ...line, end: currentPoint, node: { id: node.id, x: node.x, y: node.y, svgId: node.svgId } } // store the node's id here
            }
            return line;
        }));
    }

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove(); // clear all child elements

        const element = shapeObj.draw(svgElement);

        if (selected) {
            element.attr('stroke', '#A584A5');
            element.attr('stroke-width', 2);

            shapeObj.nodes.forEach(({x, y, svgId, id}) => {
                svgElement.append("circle")
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("r", nodeRadius)
                    .attr("fill", "blue")
                    .attr("class", "node")
                    .attr("data-id", id)
                    .on("mousedown", (event) => handleMousedown(event, {x, y, svgId, id}))
                    .on("mouseup", (event) => handleMouseup(event, {x, y, svgId, id}));
            });
        }

        // Clean up function to remove the drawn shape when the component unmounts or updates
        return () => svgElement.selectAll("*").remove();
    }, [shapeObj, selected]); // rerun effect when shapeObj, or selected changes

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
        return svgElement.append('circle').attr('cx', this.attributes.cx).attr('cy', this.attributes.cy).attr('r', this.attributes.r);
    }

    get nodes() {
        const top = { x: this.attributes.cx, y: this.attributes.cy - this.attributes.r };
        const bottom = { x: this.attributes.cx, y: this.attributes.cy + this.attributes.r };
        return [top, bottom];
    }
}

export class Path extends Shape {
    draw(svgElement) {
        return svgElement.append('path').attr('d', this.attributes.d);
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
        return svgElement.append('polygon').attr('points', this.attributes.points);
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