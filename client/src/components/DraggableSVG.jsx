import {useDrag} from "react-dnd";
import React from "react";

const DraggableSVG = ({ SVGComponent, id, setDraggedId, setMovingSVG, movingSVG }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "svg",
        item: () => {
            setDraggedId(id);
            setMovingSVG(id);
            return { id };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => {
            setMovingSVG(null);
        }
    }));

    return (
        <div
            ref={drag}
            style=
                {{
                    opacity: isDragging
                        ? 0.5
                        : 1,
                    border: (isDragging && movingSVG)
                        ? "2px solid black"
                        : "none",
                }}
        >
            <SVGComponent />
        </div>
    );
};

export default DraggableSVG;