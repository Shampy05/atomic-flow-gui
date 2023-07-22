import SVGShape from "../SvgShape";

const DownwardTriangleFilledCode = () => (
    <SVGShape
        shape="polygon"
        attributes={{
            points: "25,45 45,10 5,10",
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
)

export default DownwardTriangleFilledCode;