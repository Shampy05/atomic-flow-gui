import SVGShape, { Polygon } from "./SvgShape";

const DownwardTriangleCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => {
    const shapeObj = new Polygon({
        points: "25,45 45,10 5,10",
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

export default DownwardTriangleCode;
