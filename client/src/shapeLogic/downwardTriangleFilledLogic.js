import { NODE_TYPES, SHAPE_TYPES } from "../constants";

const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

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

    console.warn('connectedNodeTypes', connectedNodeTypes);


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
