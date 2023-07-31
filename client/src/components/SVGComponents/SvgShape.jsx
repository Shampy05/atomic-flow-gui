import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const SVGShape = ({ shapeObj, selected, setIsDrawing, setLines, lines, setStartPosition, setIsNodeClicked, svgPosition, nodeId, svgId }) => {
    const ref = useRef();
    const nodeRadius = 3;

    const getPath = function (start, end) {
        const midPoint = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };

        const k = 120

        // Using d3.path to create a path with a quadratic curve
        const path = d3.path();
        path.moveTo(start.x, start.y);
        path.bezierCurveTo(end.x - k, start.y, start.x, end.y, end.x - k, end.y);
        console.log('Start:', start);
        console.log('End:', end);
        console.log('MidPoint:', midPoint);
        console.log('Path:', path.toString());

        return path.toString();
    }




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

        const adjustedEnd = {
            x: adjustedPoint.x + 10,
            y: adjustedPoint.y + 10
        };


        const path = getPath(adjustedPoint, adjustedEnd); // Get the path for the line

        console.log('Adjusted Start Point:', adjustedPoint);
        console.log('Adjusted End Point:', adjustedEnd);
        console.log('Path:', path);


        setIsDrawing(true);
        setStartPosition(adjustedPoint);
        setLines(prev => [
            ...prev,
            {
                start: adjustedPoint,
                end: adjustedEnd,
                path,
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
            x: (point[0] + svgRect.left) / scaleX,
            y: (point[1] + svgRect.top) / scaleY
        };

        setIsDrawing(false);

        setLines(prev => prev.map(line => {
            if (line.start.x === currentPoint.x && line.start.y === currentPoint.y) { // Compare x and y values
                const newPath = getPath(line.start, currentPoint); // Get the path for the line
                return { ...line, path: newPath, end: currentPoint, node: { ...line.node } };
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

            // Draw the lines
            lines.forEach((line) => {
                console.log('Line:', line);
                svgElement
                    .append("path")
                    .attr("d", line.path)
                    .attr("stroke", "black") // Or any other color
                    .attr("fill", "none");
            });

            shapeObj.nodes.forEach(({x, y}, index) => {
                svgElement.append("circle")
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("r", nodeRadius)
                    .attr("fill", "blue")
                    .attr("class", "node")
                    .attr("data-id", nodeId[index])
                    .on("mousedown", (event) => handleMousedown(event, {x, y, svgId, nodeId: nodeId[index]}))
                    .on("mouseup", (event) => handleMouseup(event, {x, y, svgId, nodeId: nodeId[index]}));
            });
        }

        // Clean up function to remove the drawn shape when the component unmounts or updates
        return () => svgElement.selectAll("*").remove();
    }, [shapeObj, selected, lines]); // rerun effect when shapeObj, selected, or lines changes


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