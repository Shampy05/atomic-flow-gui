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
 * This function returns the shape type of the upward curved line based on the 
 * connected lines. If the upward curved line is not connected to any line, it
 * returns the default upward curved line shape type. The shape type is used to
 * determine the shape of the upward curved line.
 * 
 * @param {Object} SVG - SVG object
 * @param {Array} connectedLines - array of connected line objects
 * 
 * @returns {string} The shape type of the upward curved line.
 */
export const upwardCurvedLineLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.LEFT) && connectedNodeTypes.has(NODE_TYPES.RIGHT)) {
        return 'upwardCurvedLineWithBothLines';
    }

    return SHAPE_TYPES.UPWARD_CURVED_LINE;
}
