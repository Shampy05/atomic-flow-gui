import React, {useRef} from 'react';
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import {UpwardTriangle} from "../../components/SVGComponents";



const Canvas = ({ addSVG, SVGs }) => { // Accept SVGs as a prop

    const [, drop] = useDrop(() => ({
        accept: "svg",
        drop: (item, monitor) => {
            const dropOffset = monitor.getSourceClientOffset();

            // Get the canvas element offset
            const canvasOffset = canvasRef.current.getBoundingClientRect();

            // Calculate the position relative to the canvas
            const position = {
                x: dropOffset.x - canvasOffset.x,
                y: dropOffset.y - canvasOffset.y
            }

            console.log(position)

            addSVG(item.id, position);
        },
    }));

    const canvasRef = useRef(null);
    drop(canvasRef)

    return (
        <Box
            ref={canvasRef}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '0',
                display: 'flex',
                justifyContent: 'center',

            }}
        >
            {SVGs.map((SVG, index) => {
                console.log("blah", SVG.component); // Add this line
                return (
                    <div style={{ position: 'absolute', left: SVG.position.x, top: SVG.position.y }} key={`${SVG.id}-${index}`}>
                        {<SVG.component />}  // Here we're calling the function
                    </div>
                );
            })}

        </Box>
    );
}

export default Canvas;
