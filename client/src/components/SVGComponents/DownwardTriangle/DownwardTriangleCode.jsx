import SVGShape from "../SvgShape";

const DownwardTriangleCode = () => (
    <SVGShape
        shape="polygon"
        attributes={{
            points: "25,45 45,10 5,10",
            fill: "none",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardTriangleCode;