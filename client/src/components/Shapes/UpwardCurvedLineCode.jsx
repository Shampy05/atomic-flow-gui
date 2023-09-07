import SVGShape from "./SvgShape";
import { Path } from "./path";

/**
 * This component is used to render an upward curved line with a black stroke. The
 * curve is created by using a quadratic bezier curve. The control point is
 * calculated by finding the midpoint between the start and end points, and then
 * moving the control point up or down by a certain amount.
 * 
 * @param {object} props
 * 
 * @returns {JSX.Element} UpwardCurvedLineCode
 */
const UpwardCurvedLineCode = (props) => {
    const shapeObj = new Path({
        d: "M 10 30 Q 25 25 40 30",
        fill: "none",
        stroke: "black",
        strokeWidth: 1,
    });

    return (
        <SVGShape
            shapeObj={shapeObj}
            {...props}
        />
    );
};

export default UpwardCurvedLineCode;
