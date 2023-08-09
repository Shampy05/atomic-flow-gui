import SVGShape, { Path } from "./SvgShape";

const DownwardCurvedLineCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar, setIsLineDialogOpen }) => {
    const shapeObj = new Path({
        d: "M 10 20 Q 25 25 40 20",
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

export default DownwardCurvedLineCode;
