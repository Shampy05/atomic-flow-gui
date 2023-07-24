import SVGShape from "./SvgShape";

const UpwardTriangleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    <SVGShape
        shape="polygon"
        selected={selected}
        setLines={setLines}
        setIsDrawing={setIsDrawing}
        setStartPosition={setStartPosition}
        setIsNodeClicked={setIsNodeClicked}
        svgPosition={svgPosition}
        attributes={{
            points: "25,5 45,40 5,40",
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
);

export default UpwardTriangleFilledCode;
