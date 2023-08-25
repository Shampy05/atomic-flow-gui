import { NODE_TYPES, SHAPE_TYPES } from "../constants";

const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

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
