import { NODE_TYPES, SHAPE_TYPES } from "../constants";

const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

export const upwardTriangleFilledLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();
    const lineCurvatures = {};

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
            lineCurvatures[nodeType] = line.curvature; // Store curvature associated with node type
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.TOP) && lineCurvatures[NODE_TYPES.TOP] === "straight") {
        if (connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) && connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT)) {
            return 'upwardTriangleFilledWithThreeLines';
        } else {
            return 'upwardTriangleFilledWithTopLine';
        }
    }

    if (connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) && connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT) && !connectedNodeTypes.has(NODE_TYPES.TOP)) {
        return 'upwardTriangleFilledWithBottomTwoLines';
    }

    if (
        connectedNodeTypes.has(NODE_TYPES.BOTTOM_MIDDLE) &&
        lineCurvatures[NODE_TYPES.BOTTOM_MIDDLE] === "straight" &&
        !connectedNodeTypes.has(NODE_TYPES.TOP) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM_LEFT) &&
        !connectedNodeTypes.has(NODE_TYPES.BOTTOM_RIGHT)
    ) {
        return 'upwardTriangleFilledWithBottomLine';
    }

    return SHAPE_TYPES.UPWARD_TRIANGLE_FILLED;
}