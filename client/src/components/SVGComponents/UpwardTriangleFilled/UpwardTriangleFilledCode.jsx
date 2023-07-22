import SVGShape from "../SvgShape";

const UpwardTriangleFilledCode = () => (
    <SVGShape
        shape="polygon"
        attributes={{
            points: "25,5 45,40 5,40",
            fill: "black",
            stroke: "black",
            strokeWidth: 1,
        }}
    />
);

export default UpwardTriangleFilledCode;
