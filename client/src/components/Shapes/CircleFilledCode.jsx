import SVGShape, { Circle } from "./SvgShape";

const CircleFilledCode = ({ selected, setLines, lines, setIsDrawing, isDrawing, setStartPosition, svgId, nodeId, allNodes, setAllNodes, isSidebar, setIsLineDialogOpen }) => {
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
            lines={lines}
            setIsDrawing={setIsDrawing}
            isDrawing={isDrawing}
            setStartPosition={setStartPosition}
            setIsLineDialogOpen={setIsLineDialogOpen}
            svgId={svgId}
            nodeId={nodeId}
            allNodes={allNodes}
            isSidebar={isSidebar}
            setAllNodes={setAllNodes}
        />
    );
};

export default CircleFilledCode;
