import SVGShape from "../SvgShape";

const CircleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition }) => (
    <SVGShape
        shape="circle"
        selected={selected}
        setLines={setLines}
        setIsDrawing={setIsDrawing}
        setStartPosition={setStartPosition}
        setIsNodeClicked={setIsNodeClicked}
        svgPosition={svgPosition}
        attributes={{
            cx: 25,
            cy: 25,
            r: 20,
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default CircleFilledCode;