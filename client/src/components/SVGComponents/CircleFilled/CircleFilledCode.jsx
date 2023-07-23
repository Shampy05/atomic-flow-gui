import SVGShape from "../SvgShape";

const CircleFilledCode = ({ selected }) => (
    <SVGShape
        shape="circle"
        selected={selected}
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