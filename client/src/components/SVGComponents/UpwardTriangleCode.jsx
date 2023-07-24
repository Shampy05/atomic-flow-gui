import SVGShape from "./SvgShape";

const UpwardTriangleCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    console.log("UpwardTriangleCode.jsx -> svgPosition: ", svgPosition),
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
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)
export default UpwardTriangleCode;