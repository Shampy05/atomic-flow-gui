import SVGShape from "./SvgShape";
import { Polygon } from "./SvgShape";

const UpwardTriangleCode = ({ selected, setLines, lines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId }) => {

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
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
            svgId={svgId}
            nodeId={nodeId}
        />
    );
};

export default UpwardTriangleCode;
