import React, { useState, useMemo } from 'react';

/**
 * Grid component for rendering the grid on the canvas. This component is used by the
 * Canvas component. It is used to render the grid on the canvas.
 * 
 * @param {object} props
 * @param {number} props.width
 * @param {number} props.height
 * @param {number} props.zoomLevel
 * @param {number} props.step
 * 
 * @returns {JSX.Element} Grid
 */
const Grid = ({ width, height, zoomLevel, step }) => {
    /**
     * This is the grid that is rendered on the canvas. It is a 2D array of SVG elements that
     * are rendered on the canvas. The grid is rendered using the useMemo hook, which is used
     * to avoid unnecessary re-renders.
     * 
     * @returns {JSX.Element[]} grid
     */
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
    }, [width, height, zoomLevel]);

    return (
        <div>
            <svg width={width} height={height}>
                {grid}
            </svg>
        </div>
    );
}

export default Grid;
