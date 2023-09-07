import { NODE_TYPES, SHAPE_TYPES } from "../constants";

/**
 * @function upwardTriangleLogic
 * This function returns the shape type of the upward triangle based on the
 * connected lines. If the upward triangle is not connected to any line, it
 * returns the default upward triangle shape type. The shape type is used to
 * determine the shape of the upward triangle.
 * 
 * @param {Object} SVG - SVG object
 * @param {Array} connectedLines - array of connected line objects
 * 
 * @returns {string} The shape type of the upward triangle.
 */
export const upwardTriangleLogic = (SVG, connectedLines) => {
    let lineFromTopNode, lineFromBottomLeftNode, lineFromBottomRightNode, lineFromBottomNode;

    connectedLines.forEach(line => {
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

    if (lineFromTopNode) {
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
