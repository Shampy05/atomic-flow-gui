import SVGShape from "./SvgShape";
import { Path } from "./path";

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
