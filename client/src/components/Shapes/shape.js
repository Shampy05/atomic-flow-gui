/**
 * Abstract class for all shapes.
 * 
 * @class Shape
 *  
 * @property {Object} attributes - The attributes of the shape.
 */
export class Shape {
    /**
     * Constructor for the Shape class.
     * 
     * @constructor
     * 
     * @param {Object} attributes - The attributes of the shape.
     * 
     * @throws {TypeError} - If the constructor is called directly.
     */
    constructor(attributes) {
        if (new.target === Shape) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.attributes = attributes;
    }

    /**
     * Abstract method to draw the shape on the SVG element.
     * 
     * @abstract
     * 
     * @param {Object} svgElement - The SVG element to draw the shape on.
     * 
     * @returns {Object} The shape SVG element.
     */
    draw(svgElement) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    /**
     * Abstract method to return the nodes of the shape.
     * 
     * @abstract
     * 
     * @returns {Array} The nodes of the shape.
     */
    get nodes() {
        throw new Error("Getter 'nodes' must be implemented.");
    }
}