import SVGShape, { Polygon } from "./SvgShape";

const DownwardTriangleFilledCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar, setIsLineDialogOpen }) => {
    const shapeObj = new Polygon({
        points: "25,45 45,10 5,10",
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
            setIsNodeClicked={setIsNodeClicked}
            setIsLineDialogOpen={setIsLineDialogOpen}
            svgPosition={svgPosition}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default DownwardTriangleFilledCode;
