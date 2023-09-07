/**
 * @fileoverview This file contains the latex mapping for the shapes.
 * This is a good way to organize the code so that it is easy to import the
 * latex mapping into other components. The latex mapping is used to convert
 * the shapes into latex code.
 */

/**
 * @constant {Object} LATEX_MAP_UPWARD_TRIANGLE - object containing all the
 * upward triangle shape variations and their latex commands.
 */
export const LATEX_MAP_UPWARD_TRIANGLE = {
    'upwardTriangleWithTopLine': "\\afwu {}{}",
    'upwardTriangleWithBottomTwoLines': "\\afcun",
    'upwardTriangleWithThreeLines': "\\afcu {}{}{}{}{}{}",
    'upwardTriangleWithBottomLine': "\\afau {}{}",
    'upwardTriangle': "\\afwun",
    // ... other shape variations and their latex commands
};

/**
 * @constant {Object} LATEX_MAP_DOWNWARD_TRIANGLE - object containing all the
 * downward triangle shape variations and their latex commands.
 */
export const LATEX_MAP_DOWNWARD_TRIANGLE = {
    'downwardTriangleWithTopLine': "\\afad {}{}",
    'downwardTriangleWithTwoTopLines': "\\afcdn",
    'downwardTriangleWithThreeLines': "\\afcd {}{}{}{}{}{}",
    'downwardTriangleWithBottomLine': "\\afwd {}{}",
    'downwardTriangle': "\\afadn",
};

/**
 * @constant {Object} LATEX_MAP_UPWARD_TRIANGLE_FILLED - object containing all
 * the upward triangle filled shape variations and their latex commands.
 */
export const LATEX_MAP_UPWARD_TRIANGLE_FILLED = {
    'upwardTriangleFilledWithTopLine': "\\afwus {}{}",
    'upwardTriangleFilledWithBottomTwoLines': "\\afcuns",
    'upwardTriangleFilledWithThreeLines': "\\afcus {}{}{}{}{}{}",
    'upwardTriangleFilledWithBottomLine': "\\afaus {}{}",
    'upwardTriangleFilled': "\\afwuns",
    // ... other filled triangle shape variations and their latex commands
};

/**
 * @constant {Object} LATEX_MAP_DOWNWARD_TRIANGLE_FILLED - object containing all
 * the downward triangle filled shape variations and their latex commands.
 */
export const LATEX_MAP_DOWNWARD_TRIANGLE_FILLED = {
    'downwardTriangleFilledWithTopLine': "\\afads {}{}",
    'downwardTriangleFilledWithTwoTopLines': "\\afcdns",
    'downwardTriangleFilledWithThreeLines': "\\afcds {}{}{}{}{}{}",
    'downwardTriangleFilledWithBottomLine': "\\afwds {}{}",
    'downwardTriangleFilled': "\\afadns",
}

/**
 * @constant {Object} LATEX_MAP_UPWARD_CURVED_LINE - object containing all the
 * upward curved line shape variations and their latex commands.
 */
export const LATEX_MAP_UPWARD_CURVED_LINE = {
    'upwardCurvedLineWithBothLines': "\\afiu {}{}{}{}",
    'upwardCurvedLine': "\\afiun",
}

/**
 * @constant {Object} LATEX_MAP_DOWNWARD_CURVED_LINE - object containing all the
 * downward curved line shape variations and their latex commands.
 */
export const LATEX_MAP_DOWNWARD_CURVED_LINE = {
    'downwardCurvedLineWithBothLines': "\\afid {}{}{}{}",
    'downwardCurvedLine': "\\afidn",
}

/**
 * @constant {Object} LATEX_MAP_CIRCLE - object containing all the circle shape
 * variations and their latex commands.
 */
export const LATEX_MAP_CIRCLE = {
    'circleWithBottomLine': "\\afdd {}{}",
    'circleWithTopLine': "\\afdu {}{}",
    'circleWithTopTwoLinesAndBottomLine': "\\afcdd {}{}{}{}{}{}",
    'circleWithBottomTwoLinesAndTopLine': "\\afcud {}{}{}{}{}{}",
    'circleWithTopTwoLines': "afcddn {}{}{}{}",
    'circleWithBottomTwoLines': "\\afcudn {}{}{}{}",
    'circleFilled': "\\afd",
}

/**
 * @constant {Object} LATEX_MAP_LEFT_BULGE - object containing all the left
 * bulge arc variations and their latex commands.
 */
export const LATEX_MAP_LEFT_BULGE = {
    'left-bulge:': "\\afcl 48{}{}",
}

/**
 * @constant {Object} LATEX_MAP_RIGHT_BULGE - object containing all the right
 * bulge arc variations and their latex commands.
 */
export const LATEX_MAP_RIGHT_BULGE = {
    'right-bulge:': "\\afcr 48{}{}",
}

/**
 * @constant {Object} LATEX_MAP_S_CURVE - object containing all the s-curve
 * variations and their latex commands.
 */
export const LATEX_MAP_S_CURVE = {
    's-curve': "\\afjl 44{}{}",
}

/**
 * @constant {Object} LATEX_MAP_INVERTED_S_CURVE - object containing all the
 * inverted s-curve variations and their latex commands.
 */
export const LATEX_MAP_INVERTED_S_CURVE = {
    'inverted-s-curve': "\\afjr 44{}{}",
}
