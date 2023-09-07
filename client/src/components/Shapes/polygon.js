import { Shape } from "./shape";

/**
 * Represents a polygon. It extends the Shape class.
 * 
 * @class
 * @extends Shape
 * 
 * @property {Object} attributes - The attributes of the polygon.
 */
export class Polygon extends Shape {
    /**
     * Draws the polygon on the SVG element. It does so by appending a polygon
     * SVG element to the SVG element passed as an argument.
     * 
     * @param {Object} svgElement - The SVG element to draw the polygon on.
     * 
     * @returns {Object} The polygon SVG element.
     */
    draw(svgElement) {
        return svgElement
            .append('polygon')
            .attr('points', this.attributes.points)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    /**
     * Returns the nodes of the polygon. The nodes are the points that can be
     * dragged to draw an arc. For a polygon, the nodes are the top, top-left,
     * top-right, bottom, bottom-left, and bottom-right points. They are
     * calculated using the points attribute of the polygon.
     * 
     * @returns {Array} The nodes of the polygon.
     */
    get nodes() {
        const points = this.attributes.points.split(" ");
        const parsedPoints = points.map(point => {
            const [x, y] = point.split(",");
            return { x: parseFloat(x), y: parseFloat(y) };
        });

        // Identify if triangle is upward or downward
        const minYPoint = parsedPoints.reduce((a, b) => a.y < b.y ? a : b);
        const maxYPoint = parsedPoints.reduce((a, b) => a.y > b.y ? a : b);

        if (minYPoint.y === maxYPoint.y) {
            throw new Error("The given polygon is not recognizable as an upward or downward triangle.");
        }

        const triangleType = minYPoint === parsedPoints[0] ? 'upward' : 'downward';

        let additionalNode;

        if (triangleType === 'upward') {
            // Calculate the midpoint of the bottom edge for upward triangle
            additionalNode = {
                x: (parsedPoints[1].x + parsedPoints[2].x) / 2,
                y: (parsedPoints[1].y + parsedPoints[2].y) / 2,
                type: 'bottomMiddle'
            };
        } else {
            // For downward triangle, find the two points which are not the maxYPoint
            const topPoints = parsedPoints.filter(point => point.y !== maxYPoint.y);

            // Calculate the midpoint of the top edge for downward triangle
            additionalNode = {
                x: (topPoints[0].x + topPoints[1].x) / 2,
                y: (topPoints[0].y + topPoints[1].y) / 2,
                type: 'topMiddle'
            };
        }

        // Add the additional node to parsedPoints
        parsedPoints.push(additionalNode);

        return parsedPoints.map((point) => {
            let type = point.type;

            if (!type) { // if type is not already set
                if (triangleType === 'upward') {
                    type = point === parsedPoints[0] ? 'top' :
                        point === parsedPoints[1] ? 'bottomLeft' : 'bottomRight';
                } else {
                    type = point === parsedPoints[0] ? 'bottom' :
                        point === parsedPoints[1] ? 'topRight' : 'topLeft';
                }
            }

            return {
                x: point.x,
                y: point.y,
                type
            };
        });
    }
}
