import {Shape} from "./shape";

export class Circle extends Shape {
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
