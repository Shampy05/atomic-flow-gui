export const exportToLatex = (shape) => {
    switch(shape.type) {
        case 'TriangleWithTopLine':
            return "\\afwd {}{}";
        // Add more cases as needed.
        default:
            return '';
    }
}
