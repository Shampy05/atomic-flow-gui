import SVGShape, { Path } from "./SvgShape";

const UpwardCurvedLineCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => {
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
            setIsDrawing={setIsDrawing}
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
        />
    );
};

export default UpwardCurvedLineCode;
