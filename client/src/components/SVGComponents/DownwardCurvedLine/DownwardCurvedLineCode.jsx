import SVGShape from "../SvgShape";

const DownwardCurvedLineCode = ({ selected }) => (
    <SVGShape
        shape="path"
        selected={selected}
        attributes={{
            d: "M 10 20 Q 25 25 40 20",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardCurvedLineCode;