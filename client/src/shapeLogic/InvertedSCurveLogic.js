/**
 * @function invertedSCurveLogic
 * This function returns the shape type of the inverted S curve based on the
 * connected lines. If the inverted S curve is not connected to any line, it
 * returns the default inverted S curve shape type. 
 * 
 * @param {Object} line - line object
 * 
 * @returns {string} The shape type of the inverted S curve.
 */
export const invertedSCurveLogic = (line) => {
    return 'invertedSCurve';
}