/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { ActivateCameraProgramNode } from './activate-camera-program.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: ActivateCameraProgramNode): OptionalPromise<string> => 'Activate Program';

// factory is required
const createProgramNode = (): OptionalPromise<ActivateCameraProgramNode> => ({
    type: 'funh-vision-template-x-activate-camera-program', 
    //Noteable this type will be used in many place, and should always be consistant.
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: ActivateCameraProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: ActivateCameraProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: ActivateCameraProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: ActivateCameraProgramNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    factory: createProgramNode,
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
