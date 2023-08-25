import {NODE_TYPES, SHAPE_TYPES} from "../constants";

const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

export const downwardTriangleLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();
    const lineCurvatures = {};

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
            lineCurvatures[nodeType] = line.curvature; // Store curvature associated with node type
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.BOTTOM) && lineCurvatures[NODE_TYPES.BOTTOM] === "straight") {
        if (connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)) {
            return 'downwardTriangleWithThreeLines';
        } else {
            return 'downwardTriangleWithBottomLine';
        }
    }

    if (connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) && connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT) && !connectedNodeTypes.has(NODE_TYPES.BOTTOM)) {
        return 'downwardTriangleWithTwoTopLines';
    }

    if (
        connectedNodeTypes.has(NODE_TYPES.TOP_MIDDLE) &&
        lineCurvatures[NODE_TYPES.TOP_MIDDLE] === "straight" &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP_LEFT) &&
        !connectedNodeTypes.has(NODE_TYPES.TOP_RIGHT)
    ) {
        return 'downwardTriangleWithTopLine';
    }

    return SHAPE_TYPES.DOWNWARD_TRIANGLE;
}
