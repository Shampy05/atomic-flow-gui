import SVGShape from "./SvgShape";
import { Path } from "./path";

const DownwardCurvedLineCode = (props) => {
    const shapeObj = new Path({
        d: "M 10 20 Q 25 25 40 20",
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

export default DownwardCurvedLineCode;
