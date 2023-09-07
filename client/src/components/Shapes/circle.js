import {Shape} from "./shape";

/**
 * Represents a circle. It extends the Shape class.
 * 
 * @class
 * @extends Shape
 * 
 * @property {Object} attributes - The attributes of the circle.
 * @property {number} attributes.cx - The x-coordinate of the center of the
 * circle.
 * @property {number} attributes.cy - The y-coordinate of the center of the
 * circle.
 * @property {number} attributes.r - The radius of the circle.
 * @property {string} attributes.fill - The fill color of the circle.
 * @property {string} attributes.stroke - The stroke color of the circle.
 * @property {number} attributes.strokeWidth - The stroke width of the circle.
 */
export class Circle extends Shape {
    /**
     * Draws the circle on the SVG element. It does so by appending a circle
     * SVG element to the SVG element passed as an argument.
     * 
     * @param {Object} svgElement - The SVG element to draw the circle on.
     * 
     * @returns {Object} The circle SVG element.
     */
    draw(svgElement) {
        return svgElement
            .append('circle')
            .attr('cx', this.attributes.cx)
            .attr('cy', this.attributes.cy)
            .attr('r', this.attributes.r)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    /**
     * Returns the nodes of the circle. The nodes are the points that can be
     * dragged to draw an arc. For a circle, the nodes are the top, top-left,
     * top-right, bottom, bottom-left, and bottom-right points. They are 
     * calculated using the center and radius of the circle. 
     * 
     * @returns {Array} The nodes of the circle.
     */
    get nodes() {
        const { cx, cy, r } = this.attributes;

        const angle45 = Math.PI / 4; // 45 degrees in radians
        const dx = r * Math.cos(angle45);
        const dy = r * Math.sin(angle45);

        const top = { x: cx, y: cy - r, type: 'top' };
        const topLeft = { x: cx - dx, y: cy - dy, type: 'topLeft' };
        const topRight = { x: cx + dx, y: cy - dy, type: 'topRight' };

        const bottom = { x: cx, y: cy + r, type: 'bottom' };
        const bottomLeft = { x: cx - dx, y: cy + dy, type: 'bottomLeft' };
        const bottomRight = { x: cx + dx, y: cy + dy, type: 'bottomRight' };

        return [
            top,
            topLeft,
            topRight,
            bottom,
            bottomLeft,
            bottomRight
        ];
    }
}
