import React, {useRef} from 'react';
import { Box } from "@mui/material";
import {useDrag, useDrop} from "react-dnd";

const DraggableSVGOnCanvas = ({ SVG, setSelectedSVG, selectedSVG }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "svg",
        item: () => {
            console.log("Id: ", SVG.id);
            setSelectedSVG(SVG.id);
            return {
                id: SVG.id,
                onCanvas: true
            };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to Canvas
        setSelectedSVG(SVG.id); // Set the selected SVG to this SVG
    };

    return (
        <div
            ref={drag}
            onClick={handleClick} // Add onClick event here
            style=
                {{
                    position: "absolute",
                    left: SVG.position.x,
                    top: SVG.position.y,
                }}
        >
            <div style=
                     {{
                         opacity: isDragging ? 0.5 : 1,
                         width: "7rem",
                         border: SVG.id === selectedSVG ? '2px solid rgba(0, 0, 255, 0.5)' : 'none', // Show border if SVG is selected
                         boxShadow: SVG.id === selectedSVG ? '0px 0px 10px 2px rgba(0,0,255,0.5)' : 'none' // Add boxShadow for a more modern look
                     }}
            >
                <SVG.component />
            </div>
        </div>
    );
};

const Canvas =
    ({
                    addSVG,
                    SVGs,
                    setSVGs,
                    movingSVG,
                    setMovingSVG,
                    setSelectedSVG,
                    selectedSVG
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
                        ? {...svg, position: position, isSelected: true}
                        : {...svg, isSelected: false}
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
            onClick={() => setSelectedSVG(null)}
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
                    setSelectedSVG={setSelectedSVG}
                    selectedSVG={selectedSVG}
                    key={`${SVG.id}-${index}`}
                />
            ))}

        </Box>
    );
}

export default Canvas;
