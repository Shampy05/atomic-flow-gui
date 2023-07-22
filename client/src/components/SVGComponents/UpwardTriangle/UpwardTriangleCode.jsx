import SVGShape from "../SvgShape";

const UpwardTriangleCode = () => (
    <SVGShape
        shape="polygon"
        attributes={{
            points: "25,5 45,40 5,40",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)
export default UpwardTriangleCode;