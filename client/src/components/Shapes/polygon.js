import { Shape } from "./shape";

export class Polygon extends Shape {
    draw(svgElement) {
        return svgElement
            .append('polygon')
            .attr('points', this.attributes.points)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

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
