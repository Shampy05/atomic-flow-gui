import SVGShape, { Polygon } from "./SvgShape";

const DownwardTriangleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId, isSidebar }) => {
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

export default DownwardTriangleFilledCode;
