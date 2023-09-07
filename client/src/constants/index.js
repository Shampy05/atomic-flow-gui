/**
 * @fileoverview This file contains all the constants used in the application.
 * This is a good way to organize the code so that it is easy to import the
 * constants into other components.
 */

/**
 * @constant {Object} NODE_TYPES - object containing all the node types and
 * their values.
 * 
 * @property {string} TOP - top node type
 * @property {string} BOTTOM - bottom node type
 * @property {string} LEFT - left node type
 * @property {string} RIGHT - right node type
 * @property {string} BOTTOM_LEFT - bottom left node type
 * @property {string} BOTTOM_RIGHT - bottom right node type
 * @property {string} BOTTOM_MIDDLE - bottom middle node type
 * @property {string} TOP_LEFT - top left node type
 * @property {string} TOP_RIGHT - top right node type
 * @property {string} TOP_MIDDLE - top middle node type
 */
export const NODE_TYPES = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM_LEFT: 'bottomLeft',
    BOTTOM_RIGHT: 'bottomRight',
    BOTTOM_MIDDLE: 'bottomMiddle',
    TOP_LEFT: 'topLeft',
    TOP_RIGHT: 'topRight',
    TOP_MIDDLE: 'topMiddle'
};

/**
 * @constant {Object} SHAPE_TYPES - object containing all the shape types and
 * their values.
 * 
 * @property {string} UPWARD_TRIANGLE - upward triangle shape type
 * @property {string} DOWNWARD_TRIANGLE - downward triangle shape type
 * @property {string} UPWARD_TRIANGLE_FILLED - upward triangle filled shape type
 * @property {string} DOWNWARD_TRIANGLE_FILLED - downward triangle filled shape type
 * @property {string} UPWARD_CURVED_LINE - upward curved line shape type
 * @property {string} DOWNWARD_CURVED_LINE - downward curved line shape type
 * @property {string} CIRCLE - circle shape type
 * @property {string} RIGHT_BULGE - right bulge shape type
 * @property {string} LEFT_BULGE - left bulge shape type
 * @property {string} S_CURVE - s-curve shape type
 * @property {string} INVERTED_S_CURVE - inverted s-curve shape type
 */
export const SHAPE_TYPES = {
    UPWARD_TRIANGLE: 'upwardTriangle',
    DOWNWARD_TRIANGLE: 'downwardTriangle',
    UPWARD_TRIANGLE_FILLED: 'upwardTriangleFilled',
    DOWNWARD_TRIANGLE_FILLED: 'downwardTriangleFilled',
    UPWARD_CURVED_LINE: 'upwardCurvedLine',
    DOWNWARD_CURVED_LINE: 'downwardCurvedLine',
    CIRCLE : 'circleFilled',
    RIGHT_BULGE: 'right-bulge',
    LEFT_BULGE: 'left-bulge',
    S_CURVE: 's-curve',
    INVERTED_S_CURVE: 'inverted-s-curve',
    // ... other shape types
};

/**
 * @constant {Object} KNOWN_COLORS - array containing all the known colors.
 */
export const KNOWN_COLORS = ["red", "yellow", "green"];

/**
 * @constant {string} DEFAULT_COLOR - default color of the shapes.
 */
export const DEFAULT_COLOR = "black";