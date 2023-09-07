import { SHAPE_TYPES } from "../constants";

/**
 * @function leftBulgeLogic
 * This function returns the shape type of the left bulge arc based on the connected
 * lines. If the left bulge is not connected to any line, it returns the default
 * left bulge shape type. 
 * 
 * @returns {string} The shape type of the left bulge arc.
 */
export const leftBulgeLogic = () => {
       return SHAPE_TYPES.LEFT_BULGE;
}