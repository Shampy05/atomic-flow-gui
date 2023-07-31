import SVGShape, { Circle } from "./SvgShape";

const CircleFilledCode = ({ selected, setLines, setIsDrawing, setStartPosition, setIsNodeClicked, svgPosition, svgId, nodeId }) => {
    const shapeObj = new Circle({
        cx: 25,
        cy: 25,
        r: 20,
        fill: "black",
        stroke: "black",
        strokeWidth: 1,
    });

    return (
        <SVGShape
            shapeObj={shapeObj}
            selected={selected}
            setLines={setLines}
            setIsDrawing={setIsDrawing}
            setStartPosition={setStartPosition}
            setIsNodeClicked={setIsNodeClicked}
            svgPosition={svgPosition}
            svgId={svgId}
            nodeId={nodeId}
        />
    );
};

export default CircleFilledCode;
