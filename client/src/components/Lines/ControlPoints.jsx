export const calculateControlPoint = (start, end) => {
    const midpoint = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
    const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const offset = length / 3; // adjust this value to change the curvature

    // this will curve the line upward; change the sign to curve downward
    return {
        x: midpoint.x,
        y: midpoint.y - offset,
    };
}

export const calculateMidpoint = (start, end) => {
    return {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
};

export const calculateDoubleLineOffset = (start, end, offsetAmount) => {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    return {
        offsetX: offsetAmount * Math.sin(angle),
        offsetY: -offsetAmount * Math.cos(angle),
    };
};