import SVGShape from "../SvgShape";

const UpwardCurvedLineCode = () => (
    <SVGShape
        shape="path"
        attributes={{
            d: "M 10 30 Q 25 25 40 30",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default UpwardCurvedLineCode;