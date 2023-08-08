import {useDrag} from "react-dnd";
import React from "react";

const DraggableSVG = ({ SVGComponent, id, setDraggedId, setMovingSVG, isDrawing }) => {
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
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: isDrawing ? 'crosshair' : 'grab',
                pointerEvents: isDrawing ? 'none' : 'auto',
            }}
        >
            <SVGComponent isSidebar={true} />
        </div>
    );
};

export default DraggableSVG;