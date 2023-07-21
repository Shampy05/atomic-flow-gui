import React, {useRef} from 'react';
import { Box } from "@mui/material";
import {useDrag, useDrop} from "react-dnd";

const DraggableSVGOnCanvas = ({ SVG }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "svg",
        item: () => {
            console.log("Id: ", SVG.id);
            return {
                id: SVG.id,
                onCanvas: true
            };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div
            ref={drag}
            style=
                {{
                    opacity:
                        isDragging
                            ? 0.5
                            : 1,
                    position: "absolute",
                    left: SVG.position.x,
                    top: SVG.position.y,
                    width: "7rem"
                }}
        >
            <SVG.component />
        </div>
    );
};

const Canvas =
    ({
                    addSVG,
                    SVGs,
                    setSVGs,
    }) => {
    const [, drop] = useDrop(() => ({
        accept: "svg",
        drop: (item, monitor) => {
            const dropOffset = monitor.getSourceClientOffset();
            const canvasOffset = canvasRef.current.getBoundingClientRect();

            const position = {
                x: dropOffset.x - canvasOffset.x,
                y: dropOffset.y - canvasOffset.y
            }

            if (item.onCanvas) {
                setSVGs(prev => prev.map(svg =>
                    svg.id === item.id
                        ? {...svg, position: position}
                        : svg
                ));
            } else {
                addSVG(item.id, position);
            }
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
                background: "pink"
            }}
        >
            {SVGs.map((SVG, index) => (
                <DraggableSVGOnCanvas
                    SVG={SVG}
                    key={`${SVG.id}-${index}`}
                />
            ))}

        </Box>
    );
}

export default Canvas;
