import SVGShape, { Polygon } from "./SvgShape";

const UpwardTriangleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId }) => {
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
            setIsDrawing={setIsDrawing}
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
            svgId={svgId}
            nodeId={nodeId}
        />
    );
};

export default UpwardTriangleFilledCode;
