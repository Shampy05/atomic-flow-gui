export const parseSVGElement = (element) => {
    const type = element.tagName;
    const x = parseFloat(element.getAttribute('x') || 0);
    const y = parseFloat(element.getAttribute('y') || 0);

    return {
        type,
        x,
        y,
    }
}

export const getRelativePosition = (element1, element2) => {
    const x1 = parseFloat(element1.getAttribute('x'));
    const y1 = parseFloat(element1.getAttribute('y'));
    const x2 = parseFloat(element2.getAttribute('x'));
    const y2 = parseFloat(element2.getAttribute('y'));

    return {
        x: x1 - x2,
        y: y1 - y2,
    }
}