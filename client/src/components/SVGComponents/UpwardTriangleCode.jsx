import SVGShape from "./SvgShape";
import { Polygon } from "./SvgShape";

const UpwardTriangleCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => {
    console.log("UpwardTriangleCode.jsx -> svgPosition: ", svgPosition);

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
            setIsDrawing={setIsDrawing}
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
        />
    );
};

export default UpwardTriangleCode;
