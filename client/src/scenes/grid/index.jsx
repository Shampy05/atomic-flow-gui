import React, { useMemo } from 'react';

const Grid = ({ width, height }) => {
    const step = 100;  // interval for grid lines

    const grid = useMemo(() => {
        const elements = [];

        const halfWidthSteps = width / 2 / step;
        const halfHeightSteps = height / 2 / step;

        for (let i = 0; i < width; i += step) {
            elements.push(<line x1={i} y1={0} x2={i} y2={height} stroke="#ddd" key={`v${i}`} />);
            const xLabel = Math.round((i / step) - halfWidthSteps);
            if (xLabel !== 0) {
                elements.push(<text className="noselect" x={i + 5} y={height / 2} dy="1.5em" fontSize="10" fill="#aaa" key={`vx${i}`}>{xLabel}</text>);
            }
        }

        for (let i = 0; i < height; i += step) {
            elements.push(<line x1={0} y1={i} x2={width} y2={i} stroke="#ddd" key={`h${i}`} />);
            const yLabel = Math.round(halfHeightSteps - (i / step));
            if (yLabel !== 0) {
                elements.push(<text className="noselect" x={width / 2} y={i - 5} dx="1em" fontSize="10" fill="#aaa" key={`hy${i}`}>{yLabel}</text>);
            }
        }

        return elements;
    }, [width, height]);

    return (
        <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
            {grid}
        </svg>
    );
}

export default Grid;
