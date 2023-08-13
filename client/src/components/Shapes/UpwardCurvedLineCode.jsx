import SVGShape, { Path } from "./SvgShape";

const UpwardCurvedLineCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar, setIsLineDialogOpen }) => {
    const shapeObj = new Path({
        d: "M 10 30 Q 25 25 40 30",
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
            setIsLineDialogOpen={setIsLineDialogOpen}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default UpwardCurvedLineCode;
