import { NODE_TYPES, SHAPE_TYPES, KNOWN_COLORS, DEFAULT_COLOR } from "../constants";

export const getLineDetails = (line) => {
    const label = getLineLabels(line);
    let color = "";

    if (line.color && KNOWN_COLORS.includes(line.color.toLowerCase()) && line.color.toLowerCase() !== DEFAULT_COLOR) {
        color = `{${line.color.charAt(0).toUpperCase() + line.color.slice(1)}}`;
    }

    return { label, color, lineType: line.type };
}

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

export const adjustLatexCommandForLineType = (command, lineType) => {
    if (lineType === 'double') {
        return `${command.slice(0, 3)}${command.charAt(3).toUpperCase()}${command.slice(4)}`;
    }
    return command;
}

export const doesLineConnectToSVG = (line, SVG) => {
    return (line.startNode && line.startNode.svgId === SVG.id) || (line.endNode && line.endNode.svgId === SVG.id);
}