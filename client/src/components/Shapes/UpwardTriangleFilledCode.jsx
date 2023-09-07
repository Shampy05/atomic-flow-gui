import SVGShape from "./SvgShape";
import { Polygon } from "./polygon";

/**
 * This component is used to render an upward triangle with a black stroke.
 * 
 * @param {object} props
 * 
 * @returns {JSX.Element} UpwardTriangleCode
 */
const UpwardTriangleFilledCode = (props) => {
    const shapeObj = new Polygon({
        points: "25,5 45,40 5,40",
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
    });

    return <SVGShape shapeObj={shapeObj} {...props} />;
}

export default UpwardTriangleFilledCode;