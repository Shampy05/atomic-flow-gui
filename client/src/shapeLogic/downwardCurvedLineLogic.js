import { NODE_TYPES, SHAPE_TYPES } from "../constants";

const getConnectedNodeTypeForSVG = (line, SVG) => {
    if (line.startNode && line.startNode.svgId === SVG.id) {
        return line.startNode.type;
    } else if (line.endNode && line.endNode.svgId === SVG.id) {
        return line.endNode.type;
    }
    return null;
}

export const downwardCurvedLineLogic = (SVG, connectedLines) => {
    const connectedNodeTypes = new Set();

    connectedLines.forEach(line => {
        const nodeType = getConnectedNodeTypeForSVG(line, SVG);
        if (nodeType) {
            connectedNodeTypes.add(nodeType);
        }
    });

    if (connectedNodeTypes.has(NODE_TYPES.LEFT) && connectedNodeTypes.has(NODE_TYPES.RIGHT)) {
        return 'downwardCurvedLineWithBothLines';
    }

    return SHAPE_TYPES.DOWNWARD_CURVED_LINE;
}