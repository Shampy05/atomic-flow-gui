import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const SVGShape = ({ shape, attributes, selected }) => {
    const ref = useRef();
    const nodeRadius = 3; // radius of the nodes

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove(); // clear all child elements
        const element = svgElement.append(shape);

        // Loop over attributes object and set each attribute
        for (let key in attributes) {
            element.attr(key, attributes[key]);
        }

        if (selected) {
            element.attr('stroke', '#A584A5');
            element.attr('stroke-width', 5);

            if (shape === "path") {
                // parse points from the "d" attribute
                const pathData = attributes.d.split(" ");
                const start = { x: parseFloat(pathData[1]), y: parseFloat(pathData[2]) };
                const control = { x: parseFloat(pathData[4]), y: parseFloat(pathData[5]) };
                const end = { x: parseFloat(pathData[6]), y: parseFloat(pathData[7]) };

                // draw nodes
                const nodes = [start, end];
                nodes.forEach(({x, y}) => {
                    svgElement.append("circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("r", nodeRadius)
                        .attr("fill", "blue");
                });
            } else if (shape === "polygon") {
                // parse points from the "points" attribute
                const points = attributes.points.split(" ");
                const nodes = points.map(point => {
                    const [x, y] = point.split(",");
                    return { x: parseFloat(x), y: parseFloat(y) };
                });

                // draw nodes
                nodes.forEach(({x, y}) => {
                    svgElement.append("circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("r", nodeRadius)
                        .attr("fill", "blue");
                });
            } else if (shape === "circle") {
                // calculate top and bottom nodes
                const top = { x: attributes.cx, y: attributes.cy - attributes.r };
                const bottom = { x: attributes.cx, y: attributes.cy + attributes.r };

                // draw nodes
                const nodes = [top, bottom];
                nodes.forEach(({x, y}) => {
                    svgElement.append("circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("r", nodeRadius)
                        .attr("fill", "blue");
                });
            }
        }

        // Clean up function to remove the drawn shape when the component unmounts or updates
        return () => svgElement.selectAll("*").remove();
    }, [shape, attributes, selected]); // rerun effect when shape, attributes, or selected changes

    return (
        <Box>
            <svg ref={ref} viewBox="0 0 50 50"/>
        </Box>
    );
}

export default SVGShape;

