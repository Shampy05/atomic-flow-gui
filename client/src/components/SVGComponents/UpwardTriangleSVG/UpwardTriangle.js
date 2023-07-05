import { transform } from '@svgr/core';
import React from 'react';
// import svg file in the same folder
import { ReactComponent as UpwardTriangleSVG } from './UpwardTriangle.svg';

const svgCode =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="50 0, 100 100, 0 100" />
    </svg>`;

const jsCode = await transform(
    svgCode,
    { icon : true },
    { componentName: "UpwardTriangle" },
);

// export the transformed code as a component
export default () => <UpwardTriangleSVG />; //