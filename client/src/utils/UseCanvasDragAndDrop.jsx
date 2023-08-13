import { useDrop } from "react-dnd";

const CANVAS_SCALE_X = 2.2399307250976563;
const CANVAS_SCALE_Y = 2.2399307250976563;

const useCanvasDragAndDrop = (canvasRef, addSVG, setSVGs, setLines, handleDragEnd) => {

    const calculatePosition = (dropOffset, canvasOffset) => ({
        x: dropOffset.x - canvasOffset.x,
        y: dropOffset.y - canvasOffset.y,
    });

    const updateLinesWithPosition = (item, position) => {
        setSVGs(prev => prev.map(svg =>
            svg.id === item.id
                ? {...svg, position: position}
                : svg
        ));

        setLines(prev => prev.map(line => {
            if (line.startNode && line.startNode.svgId === item.id) {
                return {
                    ...line,
                    start: {
                        x: position.x + (line.startNode.x * CANVAS_SCALE_X),
                        y: position.y + (line.startNode.y * CANVAS_SCALE_Y),
                    },
                };
            }
            if (line.endNode && line.endNode.svgId === item.id) {
                return {
                    ...line,
                    end: {
                        x: position.x + (line.endNode.x * CANVAS_SCALE_X),
                        y: position.y + (line.endNode.y * CANVAS_SCALE_Y),
                    },
                };
            }
            return line;
        }));
    }

    const [, drop] = useDrop(() => ({
        accept: "svg",
        drop: (item, monitor) => {
            const dropOffset = monitor.getSourceClientOffset();
            const canvasOffset = canvasRef.current.getBoundingClientRect();
            const position = calculatePosition(dropOffset, canvasOffset);

            if (item.onCanvas) {
                updateLinesWithPosition(item, position);
            } else {
                addSVG(item.id, position);
            }
        },
        end: handleDragEnd
    }));

    // Attach the drop handler to the canvasRef
    drop(canvasRef);

    // If there are any other functionalities, you can add them here
}

export default useCanvasDragAndDrop;
