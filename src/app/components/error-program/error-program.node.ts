import { ProgramNode } from '@universal-robots/contribution-api';

export interface ErrorProgramNode extends ProgramNode {
    type: string;
    parameters?: {
        [key: string]: unknown;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
