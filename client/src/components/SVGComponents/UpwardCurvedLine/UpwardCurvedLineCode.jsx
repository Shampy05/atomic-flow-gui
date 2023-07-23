import SVGShape from "../SvgShape";

const UpwardCurvedLineCode = ({ selected }) => (
    <SVGShape
        shape="path"
        selected={selected}
        attributes={{
            d: "M 10 30 Q 25 25 40 30",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default UpwardCurvedLineCode;