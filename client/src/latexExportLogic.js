import { SVG_VARIATION_LOGIC } from "./shapeLogic";
import {
    LATEX_MAP_UPWARD_TRIANGLE,
    LATEX_MAP_DOWNWARD_TRIANGLE,
    LATEX_MAP_UPWARD_TRIANGLE_FILLED,
    LATEX_MAP_DOWNWARD_TRIANGLE_FILLED,
    LATEX_MAP_UPWARD_CURVED_LINE,
    LATEX_MAP_DOWNWARD_CURVED_LINE,
    LATEX_MAP_CIRCLE,
    LATEX_MAP_LEFT_BULGE,
    LATEX_MAP_RIGHT_BULGE,
    LATEX_MAP_S_CURVE,
    LATEX_MAP_INVERTED_S_CURVE
} from "./latexMapping/latexMapping";
import {
    getLineDetails,
    adjustLatexCommandForLineType,
    doesLineConnectToSVG
} from "./utils/latexUtilities";

/**
 * @function buildLatexForShape
 * This function returns the LaTeX command for the shape based on the shape type
 * and connected lines. If the shape type is not found, it returns an empty
 * string. The LaTeX command is used to render the shape in LaTeX.
 * 
 * @param {string} shapeType - shape type
 * @param {Array} connectedLines - array of connected line objects
 * 
 * @returns {string} The LaTeX command for the shape.
 */
const buildLatexForShape = (shapeType, connectedLines) => {
    console.log("Raw Connected Lines:", connectedLines);
    console.log("getLineDetails:", getLineDetails);

    /**
     * @array lineDetails
     * This array contains the details of the connected lines. The details
     * include the label, color, and line type of the connected lines.
     */
    const lineDetails = connectedLines.map(getLineDetails).filter(detail => {
        console.warn("Detail:", detail);
        return detail.curvature === 'straight' || detail.curvature === 'curved';
    });

    const labels = lineDetails.map(detail => detail.label).join('');
    const colors = lineDetails.map(detail => detail.color).join('');

    /**
     * baseCommand contains the base LaTeX command for the shape. The base
     * command is used to render the shape in LaTeX.
     * 
     * @note The base command is determined by the shape type and the connected lines.
     */
    let baseCommand = '';

    /**
     * The switch statement below determines the base command based on the shape type.
     * If the shape type is found, the base command is set to the LaTeX command for the
     * shape type. If the shape type is not found, the base command is set to an empty
     * string.
     */
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
        case 'left-bulge':
            baseCommand = colors ? `\\afcl ${labels}${colors}` : `afcl ${labels || "48"}`;
            break;
        case 'right-bulge':
            baseCommand = colors ? `\\afcr ${labels}${colors}` : `afcr ${labels || "48{}{}"}`;
            break;
        case 's-curve':
            baseCommand = colors ? `\\afjl ${labels}${colors}` : `afjl ${labels || "44{}{}"}`;
            break;
        case 'inverted-s-curve':
            baseCommand = colors ? `\\afjr ${labels}${colors}` : `afjr ${labels || "44{}{}"}`;
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
                || LATEX_MAP_LEFT_BULGE[shapeType]
                || LATEX_MAP_RIGHT_BULGE[shapeType]
                || LATEX_MAP_S_CURVE[shapeType]
                || LATEX_MAP_INVERTED_S_CURVE[shapeType]
                ||'';
    }

    // Adjust for lineType (assuming all connected lines should have the same lineType, otherwise more logic is needed)
    const lineType = lineDetails[0]?.lineType || 'single';

    return adjustLatexCommandForLineType(baseCommand, lineType);
}

/**
 * This function returns the node type of the SVG that the line connects to, or
 * null if the line does not connect to the SVG.
 * 
 * @param {Object} line - line object
 * @param {Object} SVG - SVG object
 * 
 * @returns {string} The node type of the SVG that the line connects to, or null
 */
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

/**
 * This function returns the shape type of the SVG based on the connected lines.
 * If the SVG is not connected to any line, it returns the default shape type.
 * 
 * @param {Object} SVG - SVG object
 * 
 * @returns {string} The shape type of the SVG.
 */
const parseSVG = (SVG, lines) => {
    const connectedLines = lines.filter(line => doesLineConnectToSVG(line, SVG));
    // SVG type is either the shapeType of SVG or curvature of connected line
    const svgType = SVG.curvature || SVG.shapeType;

    if (SVG_VARIATION_LOGIC[svgType]) {
        return SVG_VARIATION_LOGIC[svgType](SVG, connectedLines);
    }

    return ""; // Or a default type if none matched
}

/**
 * This function returns the LaTeX command for all SVGs based on the SVGs and
 * connected lines. If the SVGs are not connected to any line, it returns an
 * empty string. The LaTeX command is used to render the SVGs in LaTeX.
 * 
 * @param {Array} SVGs - array of SVG objects
 * 
 * @returns {string} The LaTeX command for all SVGs.
 */
function extractLatexFromAllSVGs(SVGs, lines) {
    const totalLatexComponents = SVGs.concat(
        lines.filter(
            line => line.curvature === 'left-bulge'
                || line.curvature === 'right-bulge'
                || line.curvature === 's-curve'
                || line.curvature === 'inverted-s-curve'
        )
    );
    return totalLatexComponents.map(SVG => {
        console.warn('SVG', SVG)
        const connectedLines = lines.filter(line => doesLineConnectToSVG(line, SVG) && line.curvature === 'straight' || line.curvature === 'curved');
        let svgLatexType = parseSVG(SVG, connectedLines);
        console.warn('svgLatexType', svgLatexType);
        const connectedNodes = connectedLines.flatMap(line => getConnectedNodeOfSVG(line, SVG));


        console.warn('connectedNodes', connectedNodes);
        console.warn('svgLatexType', svgLatexType);

        const latexForShape = buildLatexForShape(svgLatexType, connectedLines);

        // gridCoordinates is an object with x and y properties
        const coordinates = SVG.gridCoordinates.x + ',' + SVG.gridCoordinates.y;
        return `(${coordinates})*{\\${latexForShape}}`;

    }).join(';\n'); // This will join all LaTeX commands together with a semi-colon separator.
}

/**
 * exportToLatex is the main function that is called to export the diagram to
 * LaTeX. It returns the LaTeX command for all SVGs based on the SVGs and
 * connected lines. If the SVGs are not connected to any line, it returns an
 * empty string. The LaTeX command is used to render the SVGs in LaTeX.
 * 
 * @param {Array} SVGs - array of SVG objects
 * 
 * @returns {string} The LaTeX command for all SVGs.
 */
export const exportToLatex = (SVGs, lines) => {
    const allLatex = extractLatexFromAllSVGs(SVGs, lines);

    // Enclose the concatenated LaTeX strings in the \af{...} command
    return `\\af{\n${allLatex}}`;
}
