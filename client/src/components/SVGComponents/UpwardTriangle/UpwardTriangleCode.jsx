import SVGShape from "../SvgShape";

const UpwardTriangleCode = ({ selected }) => (
    <SVGShape
        shape="polygon"
        selected={selected}
        attributes={{
            points: "25,5 45,40 5,40",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)
export default UpwardTriangleCode;