import SVGShape from "./SvgShape";
import { Circle } from "./circle"

/**
 * This component is used to render a filled circle with a black stroke.
 * 
 * @param {object} props
 * 
 * @returns {JSX.Element} CircleFilledCode
 */
const CircleFilledCode = (props) => {
    const shapeObj = new Circle({
        cx: 25,
        cy: 25,
        r: 20,
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
    });

    return <SVGShape shapeObj={shapeObj} {...props} />;
}

export default CircleFilledCode;