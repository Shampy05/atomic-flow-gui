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
 * @function downwardTriangleFilledLogic
 * This function returns the shape type of the downward triangle filled based
 * on the connected lines. If the downward triangle filled is not connected to
 * any line, it returns the default downward triangle filled shape type. The
 * shape type is used to determine the shape of the downward triangle filled.
 * 
 * @param {Object} SVG - SVG object
 * @param {Array} connectedLines - array of connected line objects
 * 
 * @returns {string} The shape type of the downward triangle filled.
 */
export const downwardTriangleFilledLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();

    console.warn('connectedLines', connectedLines);
    console.warn('SVG', SVG);
    console.warn('connectedNodeTypes', connectedNodeTypes);

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.BOTTOM)) {
        if (connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)) {
            return 'downwardTriangleFilledWithThreeLines';
        } else {
            return 'downwardTriangleFilledWithBottomLine';
        }
    }
    if (connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)) {
        return 'downwardTriangleFilledWithTwoTopLines';
    }
    if (connectedNodeTypes.has(NODE_TYPES.TOP_MIDDLE) && !connectedNodeTypes.has(NODE_TYPES.BOTTOM) && !connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && !connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)) {
        return 'downwardTriangleFilledWithTopLine';
    }

    return SHAPE_TYPES.DOWNWARD_TRIANGLE_FILLED;
}
