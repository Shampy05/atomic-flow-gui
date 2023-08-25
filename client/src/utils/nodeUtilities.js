import * as d3 from 'd3';

export const handleNodeHover = (event) => {
    const targetNode = d3.select(event.target);
    targetNode.attr('pointer-events', 'all');
    if (event.isDrawing) {
        targetNode.attr('fill', 'red');
    }
}

export const handleNodeMouseOut = (event) => {
    const targetNode = d3.select(event.target);
    if (event.isDrawing) {
        targetNode.attr('fill', 'blue');
    }
}
