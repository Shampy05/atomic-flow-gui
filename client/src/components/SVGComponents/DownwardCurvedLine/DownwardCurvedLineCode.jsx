import SVGShape from "../SvgShape";

const DownwardCurvedLineCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    <SVGShape
        shape="path"
        selected={selected}
        setLines={setLines}
        setIsDrawing={setIsDrawing}
        setStartPosition={setStartPosition}
        setIsNodeClicked={setIsNodeClicked}
        svgPosition={svgPosition}
        attributes={{
            d: "M 10 20 Q 25 25 40 20",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardCurvedLineCode;