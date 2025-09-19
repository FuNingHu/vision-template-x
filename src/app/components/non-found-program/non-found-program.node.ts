import { ProgramNode } from '@universal-robots/contribution-api';

export interface NonFoundProgramNode extends ProgramNode {
    type: string;
    parameters: {
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
