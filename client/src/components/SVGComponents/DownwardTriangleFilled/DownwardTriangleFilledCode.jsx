import SVGShape from "../SvgShape";

const DownwardTriangleFilledCode = ({ selected }) => (
    <SVGShape
        shape="polygon"
        selected={selected}
        attributes={{
            points: "25,45 45,10 5,10",
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardTriangleFilledCode;