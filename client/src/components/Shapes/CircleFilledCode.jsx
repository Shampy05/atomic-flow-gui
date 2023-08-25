import SVGShape from "./SvgShape";
import { Circle } from "./circle"

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