import SVGShape, { Polygon } from "./SvgShape";

const UpwardTriangleFilledCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar, setIsLineDialogOpen }) => {
    const shapeObj = new Polygon({
        points: "25,5 45,40 5,40",
        fill: "black",
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
            setIsLineDialogOpen={setIsLineDialogOpen}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default UpwardTriangleFilledCode;
