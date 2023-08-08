import SVGShape, { Path } from "./SvgShape";

const DownwardCurvedLineCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId, isSidebar }) => {
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
            setIsDrawing={setIsDrawing}
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
            svgId={svgId}
            isSidebar={isSidebar}
            nodeId={nodeId}
        />
    );
};

export default DownwardCurvedLineCode;
