import {Shape} from "./shape";

/**
 * Represents a path. It extends the Shape class.
 * 
 * @class
 * @extends Shape
 * 
 * @property {Object} attributes - The attributes of the path.
 */
export class Path extends Shape {
    /**
     * Draws the path on the SVG element. It does so by appending a path
     * SVG element to the SVG element passed as an argument.
     * 
     * @param {Object} svgElement - The SVG element to draw the path on.
     * 
     * @returns {Object} The path SVG element.
     */
    draw(svgElement) {
        return svgElement
            .append('path')
            .attr('d', this.attributes.d)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

    /**
     * Returns the nodes of the path. The nodes are the points that can be
     * dragged to draw an arc. For a path, the nodes are the start and end
     * points. They are calculated using the d attribute of the path.
     * 
     * @returns {Array} The nodes of the path.
     */
    get nodes() {
        const pathData = this.attributes.d.split(" ");
        const start = { x: parseFloat(pathData[1]), y: parseFloat(pathData[2]) };
        const end = { x: parseFloat(pathData[6]), y: parseFloat(pathData[7]) };

        // Determine the left and right nodes based on x-coordinates
        let leftNode, rightNode;
        if(start.x < end.x) {
            leftNode = start;
            rightNode = end;
        } else {
            leftNode = end;
            rightNode = start;
        }

        leftNode.type = 'left';
        rightNode.type = 'right';

        return [leftNode, rightNode];
    }
}
