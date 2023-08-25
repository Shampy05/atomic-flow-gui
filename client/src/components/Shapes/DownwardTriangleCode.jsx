import SVGShape from "./SvgShape";
import { Polygon } from "./polygon";

const DownwardTriangleCode = (props) => {
    const shapeObj = new Polygon({
        points: "25,45 45,10 5,10",
        fill: "none",
        stroke: "black",
        strokeWidth: 1,
    });

    return <SVGShape shapeObj={shapeObj} {...props} />;
}

export default DownwardTriangleCode;