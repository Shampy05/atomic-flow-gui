import { upwardTriangleLogic } from "./upwardTriangleLogic";
import { downwardTriangleLogic } from "./downwardTriangleLogic";
import { upwardTriangleFilledLogic } from "./upwardTriangleFilledLogic";
import { downwardTriangleFilledLogic } from "./downwardTriangleFilledLogic";
import { upwardCurvedLineLogic } from "./upwardCurvedLineLogic";
import { downwardCurvedLineLogic } from "./downwardCurvedLineLogic";
import { circleLogic } from "./circleLogic";
import {SHAPE_TYPES} from "../constants";

export const SVG_VARIATION_LOGIC = {
    [SHAPE_TYPES.UPWARD_TRIANGLE]: upwardTriangleLogic,
    [SHAPE_TYPES.DOWNWARD_TRIANGLE]: downwardTriangleLogic,
    [SHAPE_TYPES.UPWARD_TRIANGLE_FILLED]: upwardTriangleFilledLogic,
    [SHAPE_TYPES.DOWNWARD_TRIANGLE_FILLED]: downwardTriangleFilledLogic,
    [SHAPE_TYPES.UPWARD_CURVED_LINE]: upwardCurvedLineLogic,
    [SHAPE_TYPES.DOWNWARD_CURVED_LINE]: downwardCurvedLineLogic,
    [SHAPE_TYPES.CIRCLE]: circleLogic,
}