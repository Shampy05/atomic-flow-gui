import { upwardTriangleLogic } from "./upwardTriangleLogic";
import { downwardTriangleLogic } from "./downwardTriangleLogic";
import { upwardTriangleFilledLogic } from "./upwardTriangleFilledLogic";
import { downwardTriangleFilledLogic } from "./downwardTriangleFilledLogic";
import { upwardCurvedLineLogic } from "./upwardCurvedLineLogic";
import { downwardCurvedLineLogic } from "./downwardCurvedLineLogic";
import { circleLogic } from "./circleLogic";
import { rightBulgeLogic } from "./RightBulgeLogic";
import { leftBulgeLogic } from "./LeftBulgeLogic";
import { SCurveLogic } from "./SCurveLogic";
import { invertedSCurveLogic } from "./InvertedSCurveLogic";
import {SHAPE_TYPES} from "../constants";

/**
 * @constant SVG_VARIATION_LOGIC
 * This constant maps the shape type to the logic function that determines the
 * shape of the SVG.
 */
export const SVG_VARIATION_LOGIC = {
    [SHAPE_TYPES.UPWARD_TRIANGLE]: upwardTriangleLogic,
    [SHAPE_TYPES.DOWNWARD_TRIANGLE]: downwardTriangleLogic,
    [SHAPE_TYPES.UPWARD_TRIANGLE_FILLED]: upwardTriangleFilledLogic,
    [SHAPE_TYPES.DOWNWARD_TRIANGLE_FILLED]: downwardTriangleFilledLogic,
    [SHAPE_TYPES.UPWARD_CURVED_LINE]: upwardCurvedLineLogic,
    [SHAPE_TYPES.DOWNWARD_CURVED_LINE]: downwardCurvedLineLogic,
    [SHAPE_TYPES.CIRCLE]: circleLogic,
    [SHAPE_TYPES.RIGHT_BULGE]: rightBulgeLogic,
    [SHAPE_TYPES.LEFT_BULGE]: leftBulgeLogic,
    [SHAPE_TYPES.S_CURVE]: SCurveLogic,
    [SHAPE_TYPES.INVERTED_S_CURVE]: invertedSCurveLogic,
}