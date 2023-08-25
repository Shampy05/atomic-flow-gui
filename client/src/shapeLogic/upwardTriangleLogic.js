import { NODE_TYPES, SHAPE_TYPES } from "../constants";

export const upwardTriangleLogic = (SVG, connectedLines) => {
    let lineFromTopNode, lineFromBottomLeftNode, lineFromBottomRightNode, lineFromBottomNode;

    connectedLines.forEach(line => {
        console.log('line', line);
        console.log('line.startNode', line.startNode);
        console.log('line.endNode', line.endNode);
        if (line.startNode || line.endNode) {
            if ((line.startNode && line.startNode.type === NODE_TYPES.TOP) || (line.endNode && line.endNode.type === NODE_TYPES.TOP)) {
                lineFromTopNode = line;
            } else if ((line.startNode && line.startNode.type === NODE_TYPES.BOTTOM_LEFT) || (line.endNode && line.endNode.type === NODE_TYPES.BOTTOM_LEFT)) {
                lineFromBottomLeftNode = line;
            } else if ((line.startNode && line.startNode.type === NODE_TYPES.BOTTOM_RIGHT) || (line.endNode && line.endNode.type === NODE_TYPES.BOTTOM_RIGHT)) {
                lineFromBottomRightNode = line;
            } else if ((line.startNode && line.startNode.type === NODE_TYPES.BOTTOM_MIDDLE) || (line.endNode && line.endNode.type === NODE_TYPES.BOTTOM_MIDDLE)) {
                lineFromBottomNode = line;
            }
        }
    });

    console.log('lineFromTopNode', lineFromTopNode);

    if (lineFromTopNode && lineFromTopNode.curvature === "straight") {
        if (lineFromBottomLeftNode && lineFromBottomRightNode) {
            return 'upwardTriangleWithThreeLines';
        } else {
            return 'upwardTriangleWithTopLine';
        }
    }
    if (lineFromBottomLeftNode && lineFromBottomRightNode && !lineFromTopNode) {
        return 'upwardTriangleWithBottomTwoLines';
    }
    if (lineFromBottomNode && lineFromBottomNode.curvature === "straight" && !lineFromTopNode && !lineFromBottomLeftNode && !lineFromBottomRightNode) {
        return 'upwardTriangleWithBottomLine';
    }

    return SHAPE_TYPES.UPWARD_TRIANGLE;
}
