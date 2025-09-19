import { ProgramNode } from '@universal-robots/contribution-api';

export interface VisionPickProgramNode extends ProgramNode {
    type: string;
    parameters?: {
        [key: string]: unknown;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}


export const SHARED_TOOL_SPEED_IN_M_S = 0.25;
export const SHARED_TOOL_ACCELERATION_IN_M_S2 = 1.2;
export const SHARED_BLEND_RADIUS_IN_M = 0.003;
export const SHARED_ANGULAR_SPEED_IN_RAD_S = 0.52; // 30 deg/sec
export const SHARED_ANGULAR_ACCELERATION_IN_RAD_S2 = 1.0472 //60 deg/sec