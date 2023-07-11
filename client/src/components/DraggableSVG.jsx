import {useDrag} from "react-dnd";
import React from "react";

const DraggableSVG = ({ SVGComponent, id, setDraggedId }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "svg",
        item: () => {
            setDraggedId(id);
            return { id };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <SVGComponent />
        </div>
    );
};

export default DraggableSVG;