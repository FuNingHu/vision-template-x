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
import { NonFoundProgramNode } from './non-found-program.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: NonFoundProgramNode): OptionalPromise<string> => 'Non found Program Node';

// factory is required
const createProgramNode = (): OptionalPromise<NonFoundProgramNode> => ({
    type: 'funh-vision-template-x-non-found-program',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
      pose_type: "",
      move_type: ""
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: NonFoundProgramNode): OptionalPromise<ScriptBuilder> => {
  const builder = new ScriptBuilder();
  return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: NonFoundProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: NonFoundProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: NonFoundProgramNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
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
