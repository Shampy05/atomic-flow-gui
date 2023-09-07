import {useDrag} from "react-dnd";
import React from "react";

/**
 * Component for rendering a shape on the sidebar. This component is used by the
 * Sidebar component. It is used to render a shape on the sidebar, and to handle
 * the drag and drop functionality of the shape.
 * 
 * @param {object} props
 * @param {object} props.SVGComponent - The SVG object to render.
 * @param {string} props.id - The ID of the SVG.
 * @param {function} props.setDraggedId - Function to set the ID of the dragged SVG.
 * @param {function} props.setMovingSVG - Function to set the ID of the moving SVG.
 * @param {boolean} props.isDrawing - Whether a shape is currently being drawn.
 * 
 * @returns {JSX.Element} DraggableSVG
 */
const DraggableSVG = ({ SVGComponent, id, setDraggedId, setMovingSVG, isDrawing }) => {
    /**
     * React DnD hook for handling the drag and drop functionality of the shape. This
     * hook is used to set the ID of the dragged SVG, and to set the ID of the moving
     * SVG.
     * 
     * @returns {void}
     */
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