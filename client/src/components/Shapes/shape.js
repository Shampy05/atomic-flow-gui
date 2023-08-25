export class Shape {
    constructor(attributes) {
        if (new.target === Shape) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.attributes = attributes;
    }

    draw(svgElement) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    get nodes() {
        throw new Error("Getter 'nodes' must be implemented.");
    }
}