import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

const SVGShape = ({ shape, attributes }) => {
    const ref = useRef();

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        const element = svgElement.append(shape);

        // Loop over attributes object and set each attribute
        for (let key in attributes) {
            element.attr(key, attributes[key]);
        }
    }, [shape, attributes]);

    return (
        <Box>
            <svg ref={ref} viewBox="0 0 50 50"/>
        </Box>
    );
}

export default SVGShape;
