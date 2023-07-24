import SVGShape from "./SvgShape";

const DownwardTriangleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    <SVGShape
        shape="polygon"
        selected={selected}
        setLines={setLines}
        setIsDrawing={setIsDrawing}
        setStartPosition={setStartPosition}
        setIsNodeClicked={setIsNodeClicked}
        svgPosition={svgPosition}
        attributes={{
            points: "25,45 45,10 5,10",
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardTriangleFilledCode;