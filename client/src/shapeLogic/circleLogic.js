import { NODE_TYPES, SHAPE_TYPES } from "../constants";

/**
 * @function getConnectedNodeTypeForSVG
 * This function returns the node type of the node connected to the SVG. If
 * the SVG is not connected to any node, it returns null.
 * 
 * @param {Object} line - line object
 * @param {Object} SVG - SVG object
 * 
 * @returns {string} The node type of the node connected to the SVG.
 */
const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

/**
 * @function circleLogic
 * This function returns the shape type of the circle based on the connected
 * lines. If the circle is not connected to any line, it returns the default
 * circle shape type. The shape type is used to determine the shape of the
 * circle.
 * 
 * @param {Object} SVG - SVG object
 * @param {Array} connectedLines - array of connected line objects
 * 
 * @returns {string} The shape type of the circle.
 */
export const circleLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.TOP) && !connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && !connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT) && !connectedNodeTypes.has(NODE_TYPES.BOTTOM)) {
        if (connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) && connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT)) {
            return "circleWithBottomTwoLinesAndTopLine";
        } else {
            return "circleWithTopLine";
        }
    }

    if (connectedNodeTypes.has(NODE_TYPES.BOTTOM) && !connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) && !connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT) && !connectedNodeTypes.has(NODE_TYPES.TOP)) {
        if (connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)) {
            return "circleWithTopTwoLinesAndBottomLine";
        } else {
            return "circleWithBottomLine";
        }
    }

    if (
        connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) &&
        connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM)
    ) {
        return "circleWithTopTwoLines";
    }

    if (
        connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) &&
        connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM)
    ) {
        return "circleWithBottomTwoLines";
    }

    return SHAPE_TYPES.CIRCLE;
}
