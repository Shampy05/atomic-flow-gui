import SVGShape, { Path } from "./SvgShape";

const UpwardCurvedLineCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar }) => {
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
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default UpwardCurvedLineCode;
