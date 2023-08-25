import { SVG_VARIATION_LOGIC } from "./shapeLogic";
import {
    LATEX_MAP_UPWARD_TRIANGLE,
    LATEX_MAP_DOWNWARD_TRIANGLE,
    LATEX_MAP_UPWARD_TRIANGLE_FILLED,
    LATEX_MAP_DOWNWARD_TRIANGLE_FILLED,
    LATEX_MAP_UPWARD_CURVED_LINE,
    LATEX_MAP_DOWNWARD_CURVED_LINE,
    LATEX_MAP_CIRCLE,
} from "./latexMapping/latexMapping";
import {
    getLineDetails,
    adjustLatexCommandForLineType,
    doesLineConnectToSVG
} from "./utils/latexUtilities";

const buildLatexForShape = (shapeType, connectedLines) => {
    console.log("Raw Connected Lines:", connectedLines);
    const lineDetails = connectedLines.map(getLineDetails);

    console.log("Line Details:", lineDetails);

    const labels = lineDetails.map(detail => detail.label).join('');
    const colors = lineDetails.map(detail => detail.color).join('');

    let baseCommand = '';
    switch (shapeType) {
        case 'upwardTriangleWithThreeLines':
            baseCommand = colors ? `\\afcuc ${labels}${colors}` : `afcu ${labels || "{}{}{}{}{}{}"}`;
            break;
        case 'upwardTriangleWithTopLine':
            baseCommand = colors ? `\\afwuc ${labels}${colors}` : `afwu ${labels || "{}{}"}`;
            break;
        case 'upwardTriangleWithBottomTwoLines':
            baseCommand = colors ? `\\afcunc ${labels}${colors}` : `afcun ${labels || "{}{}"}`;
            break;
        case 'upwardTriangleWithBottomLine':
            baseCommand = colors ? `\\afauc ${labels}${colors}` : `afau ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleWithTopLine':
            baseCommand = colors ? `\\afadc ${labels}${colors}` : `afad ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleWithThreeLines':
            baseCommand = colors ? `\\afcdc ${labels}${colors}` : `afcd ${labels || "{}{}{}{}{}{}"}`;
            break;
        case 'downwardTriangleWithTwoTopLines':
            baseCommand = colors ? `\\afcdnc ${labels}${colors}` : `afcdn ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleWithBottomLine':
            baseCommand = colors ? `\\afwdc ${labels}${colors}` : `afwd ${labels || "{}{}"}`;
            break;
        case 'upwardTriangleFilledWithThreeLines':
            baseCommand = colors ? `\\afcusc ${labels}${colors}` : `afcus ${labels || "{}{}{}{}{}{}"}`;
            break;
        case 'upwardTriangleFilledWithTopLine':
            baseCommand = colors ? `\\afwusc ${labels}${colors}` : `afwus ${labels || "{}{}"}`;
            break;
        case 'upwardTriangleFilledWithBottomTwoLines':
            baseCommand = colors ? `\\afcunsc ${labels}${colors}` : `afcuns ${labels || "{}{}"}`;
            break;
        case 'upwardTriangleFilledWithBottomLine':
            baseCommand = colors ? `\\afausc ${labels}${colors}` : `afaus ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleFilledWithTopLine':
            baseCommand = colors ? `\\afadsc ${labels}${colors}` : `afads ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleFilledWithThreeLines':
            baseCommand = colors ? `\\afcdsc ${labels}${colors}` : `afcds ${labels || "{}{}{}{}{}{}"}`;
            break;
        case 'downwardTriangleFilledWithTwoTopLines':
            baseCommand = colors ? `\\afcdnsc ${labels}${colors}` : `afcdns ${labels || "{}{}"}`;
            break;
        case 'downwardTriangleFilledWithBottomLine':
            baseCommand = colors ? `\\afwdsc ${labels}${colors}` : `afwds ${labels || "{}{}"}`;
            break;
        case 'upwardCurvedLineWithBothLines':
            baseCommand = colors ? `\\afiuc ${labels}${colors}` : `afiu ${labels || "{}{}"}`;
            break;
        case 'downwardCurvedLineWithBothLines':
            baseCommand = colors ? `\\afidc ${labels}${colors}` : `afid ${labels || "{}{}"}`;
            break;
        case 'circleWithBottomLine':
            baseCommand = colors ? `\\afddc ${labels}${colors}` : `afdd ${labels || "{}{}"}`;
            break;
        case 'circleWithTopLine':
            baseCommand = colors ? `\\afduc ${labels}${colors}` : `afdu ${labels || "{}{}"}`;
            break;
        case 'circleWithTopTwoLinesAndBottomLine':
            baseCommand = colors ? `\\afcddc ${labels}${colors}` : `afdcn ${labels || "{}{}"}`;
            break;
        case 'circleWithBottomTwoLinesAndTopLine':
            baseCommand = colors ? `\\afcudc ${labels}${colors}` : `afcud ${labels || "{}{}"}`;
            break;
        case 'circleWithTopTwoLines':
            baseCommand = colors ? `\\afcddnc ${labels}${colors}` : `afcddn ${labels || "{}{}"}`;
            break;
        case 'circleWithBottomTwoLines':
            baseCommand = colors ? `\\afcudnc ${labels}${colors}` : `afcudn ${labels || "{}{}"}`;
            break;
        default:
            baseCommand =
                LATEX_MAP_UPWARD_TRIANGLE[shapeType]
                || LATEX_MAP_DOWNWARD_TRIANGLE[shapeType]
                || LATEX_MAP_UPWARD_TRIANGLE_FILLED[shapeType]
                || LATEX_MAP_DOWNWARD_TRIANGLE_FILLED[shapeType]
                || LATEX_MAP_UPWARD_CURVED_LINE[shapeType]
                || LATEX_MAP_DOWNWARD_CURVED_LINE[shapeType]
                || LATEX_MAP_CIRCLE[shapeType]
                ||'';
    }

    // Adjust for lineType (assuming all connected lines should have the same lineType, otherwise more logic is needed)
    const lineType = lineDetails[0]?.lineType || 'single';

    return adjustLatexCommandForLineType(baseCommand, lineType);
}

function getConnectedNodeOfSVG(line, SVG) {
    // This function should return the node (like 'topLeft', 'bottomRight')
    // of the SVG that the line connects to, or null if the line does not connect to the SVG.
    const nodes = []

    if (line.startNode.svgId === SVG.id) {
        nodes.push(line.startNode);
    }

    if (line.endNode && line.endNode.svgId === SVG.id) {
        nodes.push(line.endNode);
    }

    console.log('nodes in getConnectedNodeOfSVG', nodes);

    return nodes.length === 1 ? nodes[0] : null;
}


const parseSVG = (SVG, lines) => {
    const connectedLines = lines.filter(line => doesLineConnectToSVG(line, SVG));
    const svgType = SVG.shapeType;


    if (SVG_VARIATION_LOGIC[svgType]) {
        return SVG_VARIATION_LOGIC[svgType](SVG, connectedLines);
    }

    return ""; // Or a default type if none matched
}

function extractLatexFromAllSVGs(SVGs, lines) {
    // This will map over all SVGs, convert each to LaTeX, and format with coordinates
    console.log('lines in extractLatexFromAllSVGs', lines);
    return SVGs.map(SVG => {
        const connectedLines = lines.filter(line => doesLineConnectToSVG(line, SVG));
        let svgLatexType = parseSVG(SVG, connectedLines);
        const connectedNodes = connectedLines.flatMap(line => getConnectedNodeOfSVG(line, SVG));


        console.warn('connectedNodes', connectedNodes);
        console.warn('svgLatexType', svgLatexType);
        // Check and adjust SVG type based on connected nodes
        if (svgLatexType === 'upwardTriangleFilledWithThreeLines' && connectedNodes.type === 'top') {
            svgLatexType = 'upwardTriangleFilledWithBottomTwoLines';
        }

        const latexForShape = buildLatexForShape(svgLatexType, connectedLines);

        // gridCoordinates is an object with x and y properties
        const coordinates = SVG.gridCoordinates.x + ',' + SVG.gridCoordinates.y;
        return `(${coordinates})*{\\${latexForShape}}`;

    }).join(';\n'); // This will join all LaTeX commands together with a semi-colon separator.
}

export const exportToLatex = (SVGs, lines) => {
    console.log('SVGs', SVGs);
    const allLatex = extractLatexFromAllSVGs(SVGs, lines);

    // Enclose the concatenated LaTeX strings in the \af{...} command
    return `\\af{\n${allLatex}}`;
}
