/// <reference lib="webworker" />
import {
    Acceleration,
    AccelerationUnits,
    AngularAccelerationUnits,
    AngularSpeedUnits,
    CommentNode,
    FolderNode,
    InsertionContext,
    Length,
    LengthUnits,
    MovementType,
    MovesToNode,
    MoveToBlendSettings,
    MoveToNode,
    MoveToSpeedSettings,
    MoveToTransformSettings,
    MoveType,
    NodeType,
    OptionalPromise,
    ProgramBehaviorAPI,
    ProgramBehaviors,
    ProgramNode,
    ProgramNodeService,
    registerProgramBehavior,
    ScriptBuilder,
    Speed,
    SpeedUnits,
    TabInputModel,
    URVariable,
    ValidationContext,
    ValidationResponse,
    Value,
    VariableValueType
} from '@universal-robots/contribution-api';
import { SHARED_ANGULAR_ACCELERATION_IN_RAD_S2, SHARED_ANGULAR_SPEED_IN_RAD_S, SHARED_BLEND_RADIUS_IN_M, SHARED_TOOL_ACCELERATION_IN_M_S2, SHARED_TOOL_SPEED_IN_M_S, VisionPickProgramNode } from './vision-pick-program.node';
import { PartFoundProgramNode } from '../part-found-program/part-found-program.node';
import { NonFoundProgramNode } from '../non-found-program/non-found-program.node';
import { ErrorProgramNode } from '../error-program/error-program.node';
import { SelectedInput } from '@universal-robots/ui-models';
import { allUnits } from '@universal-robots/utilities-units';

// programNodeLabel is required
const createProgramNodeLabel = (node: VisionPickProgramNode): OptionalPromise<string> => 'Vision Pick Program';

// factory is required
// const createProgramNode = (): OptionalPromise<VisionPickProgramNode> => ({
//     type: 'funh-vision-template-x-vision-pick-program',
//     version: '1.0.0',
//     lockChildren: false,
//     allowsChildren: false,
//     parameters: {
//     },
// });
async function createMovesToNode(moveType: MoveType, suggestedName: string): Promise<MovesToNode>{
    const builder = new ProgramBehaviorAPI(self).builder;
    const movestonode = (await builder.createNode(NodeType.JOINT_MOVE)) as MovesToNode;
    const symbolService = new ProgramBehaviorAPI(self).symbolService;
    const pointName = await symbolService.generateVariable(suggestedName, VariableValueType.WAYPOINT);
    movestonode.parameters.variable = new TabInputModel<URVariable>(pointName, 'VALUE', pointName.name);
    movestonode.parameters.moveType = moveType;
    movestonode.parameters.motionProfile = 'VisionPickMP';
    movestonode.type = NodeType.JOINT_MOVE;
    movestonode.version = "1.0.0";
    const blendSettings: MoveToBlendSettings = {
        enabled: true,
        radius: new TabInputModel<Length>(
            {
                value: SHARED_BLEND_RADIUS_IN_M,
                unit: LengthUnits[0], //meter
            },
            SelectedInput.VALUE,
            SHARED_BLEND_RADIUS_IN_M,
        ),
        
    };
    const speedAngularSettings: MoveToSpeedSettings={
        acceleration: new TabInputModel<Acceleration>(
            {
                value: SHARED_ANGULAR_ACCELERATION_IN_RAD_S2,
                unit: AngularAccelerationUnits[0], //rad/s2
            },
            SelectedInput.VALUE,
            SHARED_ANGULAR_ACCELERATION_IN_RAD_S2
        ),
        speed: new TabInputModel<Speed>(
            {
                value: SHARED_ANGULAR_SPEED_IN_RAD_S,
                unit: AngularSpeedUnits[0], //rad/s2
            },
            SelectedInput.VALUE,
            SHARED_ANGULAR_SPEED_IN_RAD_S
        ),
        motionValue: MovementType.Classic,
        optiMoveSpeed: new TabInputModel<Value<string>>(
            {
                value: 19,
                unit: '%',
            },
            SelectedInput.VALUE,
            19
        ),
        optiMoveAcceleration: new TabInputModel<Value<string>>(
            {
                value: 4,
                unit: '%',
            },
            SelectedInput.VALUE,
            4
        )
    }
    const speedLinearSettings: MoveToSpeedSettings={
        acceleration: new TabInputModel<Acceleration>(
            {
                value: SHARED_TOOL_ACCELERATION_IN_M_S2,
                unit: AccelerationUnits[0], //meter/s2
            },
            SelectedInput.VALUE,
            SHARED_TOOL_ACCELERATION_IN_M_S2
        ),
        speed: new TabInputModel<Speed>(
            {
                value: SHARED_TOOL_SPEED_IN_M_S,
                unit: SpeedUnits[0], //meter/s
            },
            SelectedInput.VALUE,
            SHARED_TOOL_SPEED_IN_M_S
        ),
        motionValue: MovementType.Classic,
        optiMoveSpeed: new TabInputModel<Value<string>>(
            {
                value: 15,
                unit: '%',
            },
            SelectedInput.VALUE,
            15
        ),
        optiMoveAcceleration: new TabInputModel<Value<string>>(
            {
                value: 2,
                unit: '%',
            },
            SelectedInput.VALUE,
            2
        )
    };
    const transformSettings: MoveToTransformSettings={
        transform: false
    };
    movestonode.parameters.advanced = {
        speed: moveType === 'moveJ'? speedLinearSettings : speedAngularSettings,
        blend: blendSettings,
        transform: transformSettings
    };
    ////////end of movenode settings////////////////////

    return movestonode;
}
async function createMoveToNode(moveType: MoveType, suggestedName: string): Promise<MoveToNode>{
    const builder = new ProgramBehaviorAPI(self).builder;
    const movetonode = (await builder.createNode(NodeType.MOVE_TO)) as MoveToNode;
    const symbolService = new ProgramBehaviorAPI(self).symbolService;
    const pointName = await symbolService.generateVariable(suggestedName, VariableValueType.WAYPOINT);
    movetonode.parameters.variable = new TabInputModel<URVariable>(pointName, 'VALUE', pointName.name);
    movetonode.parameters.moveType = moveType;
    movetonode.type = NodeType.MOVE_TO;
    movetonode.version = "1.0.0";

    const blendSettings: MoveToBlendSettings = {
        enabled: true,
        radius: new TabInputModel<Length>(
            {
                value: SHARED_BLEND_RADIUS_IN_M,
                unit: LengthUnits[0], //meter
            },
            SelectedInput.VALUE,
            SHARED_BLEND_RADIUS_IN_M,
        ),
    };
    const speedAngularSettings: MoveToSpeedSettings={
        acceleration: new TabInputModel<Acceleration>(
            {
                value: SHARED_ANGULAR_ACCELERATION_IN_RAD_S2,
                unit: AngularAccelerationUnits[0], //rad/s2
            },
            SelectedInput.VALUE,
            SHARED_ANGULAR_ACCELERATION_IN_RAD_S2
        ),
        speed: new TabInputModel<Speed>(
            {
                value: SHARED_ANGULAR_SPEED_IN_RAD_S,
                unit: AngularSpeedUnits[0], //rad/s2
            },
            SelectedInput.VALUE,
            SHARED_ANGULAR_SPEED_IN_RAD_S
        ),
        motionValue: MovementType.Classic,
        optiMoveSpeed: new TabInputModel<Value<string>>(
            {
                value: 19,
                unit: '%',
            },
            SelectedInput.VALUE,
            19
        ),
        optiMoveAcceleration: new TabInputModel<Value<string>>(
            {
                value: 4,
                unit: '%',
            },
            SelectedInput.VALUE,
            4
        )
    }
    const speedLinearSettings: MoveToSpeedSettings={
        acceleration: new TabInputModel<Acceleration>(
            {
                value: SHARED_TOOL_ACCELERATION_IN_M_S2,
                unit: AccelerationUnits[0], //meter/s2
            },
            SelectedInput.VALUE,
            SHARED_TOOL_ACCELERATION_IN_M_S2
        ),
        speed: new TabInputModel<Speed>(
            {
                value: SHARED_TOOL_SPEED_IN_M_S,
                unit: SpeedUnits[0], //meter/s
            },
            SelectedInput.VALUE,
            SHARED_TOOL_SPEED_IN_M_S
        ),
        motionValue: MovementType.Classic,
        optiMoveSpeed: new TabInputModel<Value<string>>(
            {
                value: 15,
                unit: '%',
            },
            SelectedInput.VALUE,
            15
        ),
        optiMoveAcceleration: new TabInputModel<Value<string>>(
            {
                value: 2,
                unit: '%',
            },
            SelectedInput.VALUE,
            2
        )
    };
    const transformSettings: MoveToTransformSettings={
        transform: false
    };
    movetonode.parameters.advanced = {
        speed: moveType === 'moveL'? speedLinearSettings : speedAngularSettings,
        blend: blendSettings,
        transform: transformSettings
    };
    ////////end of movenode settings////////////////////

    return movetonode;
}

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: VisionPickProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: VisionPickProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: VisionPickProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: VisionPickProgramNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
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
    factory: async()=> {
        const api = new ProgramBehaviorAPI(self);
        const visionPickProgramNode = {
            type: 'funh-vision-template-x-vision-pick-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: false,
            parameters: {
            },

        } as VisionPickProgramNode;
        const visionPickBranch = api.builder.createBranchNode(visionPickProgramNode);

        const partFoundProgramNode = {
            type: 'funh-vision-template-x-part-found-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: true,
            parameters: {
            },
        } as PartFoundProgramNode;
        const partFoundBranch = api.builder.createBranchNode(partFoundProgramNode);
        const gripNode = (await api.builder.createNode(NodeType.FOLDER)) as FolderNode;
        gripNode.parameters.folderName = 'Put Gripper CMD here:';
        const gripBranch = api.builder.createBranchNode(gripNode);

        const nonpartNode =  {
            type: 'funh-vision-template-x-non-found-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: false,
            parameters: {
            pose_type: "",
            move_type: ""
            },
        } as NonFoundProgramNode;
        const nonpartBranch = api.builder.createBranchNode(nonpartNode);
        const nonpartCommentNode = (await api.builder.createNode(NodeType.COMMENT)) as CommentNode;
        nonpartCommentNode.parameters.comment = 'Insert your no parts handling code';

        const errorNode = {
            type: 'funh-vision-template-x-error-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: false,
            parameters: {
            },
        } as ErrorProgramNode;
        const errorBranch = api.builder.createBranchNode(errorNode);
        const errorCommentNode = (await api.builder.createNode(NodeType.COMMENT)) as CommentNode;
        errorCommentNode.parameters.comment = 'Insert your error handling code';

        // const moveJApproachNode = await createMoveToNode("moveJ", "Approach");
        const moveJApproachNode = await createMovesToNode("moveJ", "Approach");
        const moveLTargetNode = await createMoveToNode("moveL", "PreTarget");

        const moveJExitNode = await createMoveToNode("moveJ", "Exit");

        const moveLPickNode = await createMoveToNode("moveL", "Pick");

        api.builder.appendChild(partFoundBranch,    moveJApproachNode);
        api.builder.appendChild(partFoundBranch,    moveLTargetNode);
        api.builder.appendChild(partFoundBranch,    gripBranch); 
        api.builder.appendChild(gripBranch,         moveLPickNode);
        api.builder.appendChild(partFoundBranch,    moveJExitNode);
        api.builder.appendChild(nonpartBranch,      nonpartCommentNode);
        api.builder.appendChild(errorBranch,        errorCommentNode);
        api.builder.appendChild(visionPickBranch,   partFoundBranch);
        api.builder.appendChild(visionPickBranch,   nonpartBranch);
        api.builder.appendChild(visionPickBranch,   errorBranch);
        
        

        return visionPickBranch;
    },
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
