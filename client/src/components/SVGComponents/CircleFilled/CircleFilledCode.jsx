import SVGShape from "../SvgShape";

const CircleFilledCode = () => (
    <SVGShape
        shape="circle"
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