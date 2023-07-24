import SVGShape from "./SvgShape";

const UpwardCurvedLineCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    <SVGShape
        shape="path"
        selected={selected}
        setLines={setLines}
        setIsDrawing={setIsDrawing}
        setStartPosition={setStartPosition}
        setIsNodeClicked={setIsNodeClicked}
        svgPosition={svgPosition}
        attributes={{
            d: "M 10 30 Q 25 25 40 30",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default UpwardCurvedLineCode;