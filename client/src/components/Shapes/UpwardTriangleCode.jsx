import SVGShape from "./SvgShape";
import { Polygon } from "./SvgShape";

const UpwardTriangleCode =
    ({
                                selected,
                                setLines,
                                lines,
                                setIsDrawing,
                                isDrawing,
                                setStartPosition,
                                svgId,
                                nodeId,
                                allNodes,
                                setAllNodes,
                                isSidebar,
                                setIsLineDialogOpen,
                                currentGridPosition,
                                canvasDimensions,
    }) => {

    const shapeObj = new Polygon({
        points: "25,5 45,40 5,40",
        fill: "none",
        stroke: "black",
        strokeWidth: 1,
    });

    return (
        <SVGShape
            shapeObj={shapeObj}
            selected={selected}
            setLines={setLines}
            lines={lines}
            setIsDrawing={setIsDrawing}
            isDrawing={isDrawing}
            setStartPosition={setStartPosition}
            currentGridPosition={currentGridPosition}
            canvasDimensions={canvasDimensions}
            setIsLineDialogOpen={setIsLineDialogOpen}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default UpwardTriangleCode;
