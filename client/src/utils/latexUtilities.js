import { NODE_TYPES, SHAPE_TYPES, KNOWN_COLORS, DEFAULT_COLOR } from "../constants";

/**
 * @function getLineDetails
 * This function returns the details of the line. The details include the label,
 * color, curvature, and line type. The label is the text that appears on the
 * line. The color is the color of the line. The curvature is the curvature of
 * the line. The line type is the type of the line.
 * 
 * @param {Object} line - line object
 * 
 * @returns {Object} The details of the line.
 */
export const getLineDetails = (line) => {
    const label = getLineLabels(line);
    let color = "";

    if (line.color && KNOWN_COLORS.includes(line.color.toLowerCase()) && line.color.toLowerCase() !== DEFAULT_COLOR) {
        color = `{${line.color.charAt(0).toUpperCase() + line.color.slice(1)}}`;
    }

    const curvature = line.curvature ? line.curvature : "straight";

    return { label, color, curvature, lineType: line.type };
}

/**
 * @function getLineLabels
 * This function returns the labels of the line. The labels include the left
 * label and the right label. The left label is the text that appears on the
 * left side of the line. The right label is the text that appears on the right
 * side of the line.
 * 
 * @param {Object} line - line object
 * 
 * @returns {string} The labels of the line.
 */
export const getLineLabels = (line) => {
    // This function will extract labels from the line.
    // If a label exists, it will return it; otherwise, it will return "{}".
    const { leftText, rightText } = line;

    // Format the left label. If it doesn't exist, return "{}"
    const formattedLeftText = leftText ? leftText : "{}";

    // Format the right label. If it doesn't exist, return "{}"
    const formattedRightText = rightText ? rightText : "{}";

    return `${formattedLeftText}${formattedRightText}`;
}

/**
 * @function adjustLatexCommandForLineType
 * This function adjusts the LaTeX command for the line type. If the line type
 * is double, it will capitalize the first letter of the command.
 * 
 * @param {string} command - LaTeX command
 * @param {string} lineType - line type
 * 
 * @returns {string} The adjusted LaTeX command.
 */
export const adjustLatexCommandForLineType = (command, lineType) => {
    if (lineType === 'double') {
        return `${command.slice(0, 3)}${command.charAt(3).toUpperCase()}${command.slice(4)}`;
    }
    return command;
}

/**
 * @function doesLineConnectToSVG
 * This function returns whether the line connects to the SVG. If the line
 * connects to the SVG, it returns true; otherwise, it returns false.
 * 
 * @param {Object} line - line object
 * @param {Object} SVG - SVG object
 * 
 * @returns {boolean} Whether the line connects to the SVG.
 */
export const doesLineConnectToSVG = (line, SVG) => {
    return (line.startNode && line.startNode.svgId === SVG.id) || (line.endNode && line.endNode.svgId === SVG.id);
}