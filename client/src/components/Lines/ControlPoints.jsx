/**
 * Calculates the control point for a quadratic bezier curve. The control point is the point that
 * determines the curvature of the line. The control point is calculated by finding the midpoint
 * between the start and end points, and then moving the control point up or down by a certain
 * amount. The amount is determined by the length of the line.
 * 
 * @param {Object} start The start point of the line.
 * @param {Object} end The end point of the line.
 * 
 * @returns {Object} The control point.
 */
export const calculateControlPoint = (start, end) => {
    const midpoint = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const offset = length / 3; // adjust this value to change the curvature

    // this will curve the line upward; change the sign to curve downward
    return {
        x: midpoint.x,
        y: midpoint.y - offset,
    };
}

/**
 * Calculates the midpoint between two points.
 * 
 * @param {Object} start The start point of the line.
 * @param {Object} end The end point of the line.
 * 
 * @returns {Object} The midpoint.
 */
export const calculateMidpoint = (start, end) => {
    return {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
};


/**
 * Calculates the offset for a double line. The offset is the amount that the line is moved
 * perpendicular to itself. The offset is calculated by finding the angle of the line, and then
 * moving the line perpendicular to itself by a certain amount. The amount is determined by the
 * length of the line.
 * 
 * @param {Object} start The start point of the line.
 * @param {Object} end The end point of the line.
 * @param {number} offsetAmount The amount to offset the line by.
 * 
 * @returns {Object} The offset.
 */
export const calculateDoubleLineOffset = (start, end, offsetAmount) => {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    return {
        offsetX: offsetAmount * Math.sin(angle),
        offsetY: -offsetAmount * Math.cos(angle),
    };
};

/**
 * Calculates the coordinates of the line grid for a given line. The line grid is a 2D array of
 * booleans that represents the line grid. Each element in the array represents a square in the
 * line grid. If the element is true, then the square is part of the line. If the element is
 * false, then the square is not part of the line.
 * 
 * @param {Object} line The line.
 * @param {Object} canvasDimensions The dimensions of the canvas.
 * 
 * @returns {Object} The coordinates of the line grid.
 */ 
export const calculateLineGridCoordinates = (line, canvasDimensions) => {
    const step = 100;
    const translatedX = line.midpoint.x - (canvasDimensions.width / 2);
    const translatedY = line.midpoint.y - (canvasDimensions.height / 2);

    return {
        x: Math.round(translatedX / step),
        y: Math.round(-translatedY / step)
    }
}