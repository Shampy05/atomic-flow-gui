import {Shape} from "./shape";

export class Path extends Shape {
    draw(svgElement) {
        return svgElement
            .append('path')
            .attr('d', this.attributes.d)
            .attr('fill', this.attributes.fill || 'none')
            .attr('stroke', this.attributes.stroke || 'black')
            .attr('stroke-width', this.attributes.strokeWidth || 1);
    }

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
