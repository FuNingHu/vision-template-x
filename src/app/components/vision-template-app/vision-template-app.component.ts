import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationPresenterAPI, ApplicationPresenter, RobotSettings, URVariable, URSymbolType, TabInputModel, Speed, Acceleration, Value, MotionProfileMoveParameters, MovementType, MotionProfile, MotionProfilesNode } from '@universal-robots/contribution-api';
import { VisionTemplateAppNode } from './vision-template-app.node';

@Component({
    templateUrl: './vision-template-app.component.html',
    styleUrls: ['./vision-template-app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class VisionTemplateAppComponent implements ApplicationPresenter, OnChanges {
    // applicationAPI is optional
    @Input() applicationAPI: ApplicationPresenterAPI;
    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // applicationNode is required
    @Input() applicationNode: VisionTemplateAppNode;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }
    motionProfileNode: MotionProfilesNode;
    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
            
            this.createMotionProfile();
        }
    }

    createMotionProfile(){
        const myVar: URVariable = {
            type: URSymbolType.Variable,
            name: 'VisionPickMP'
        };
        const mySpeed: TabInputModel<Speed> ={
            entity: {
                value: 1.134464014,
                unit: 'rad/s'
            },
            selectedType: 'VALUE',
            value: 1.134464014
        };
        
        const myAcceleration: TabInputModel<Acceleration> ={
            entity: {
                value: 1.483529864,
                unit: 'rad/s^2'
            },
            selectedType: 'VALUE',
            value: 1.483529864
        };
    
        const myOptiMoveSpeed: TabInputModel<Value> ={
            entity:{
                value: 19,
                unit: '%'
            },
            selectedType: 'VALUE',
            value: 19
        };
    
        const myOptiMoveAcceleration: TabInputModel<Value> = {
            entity: {
                value: 4,
                unit: '%'
            },
            selectedType: 'VALUE',
            value: 4
        };
    
        // Combine into motion parameters
        const myParameters: MotionProfileMoveParameters = {
            speedType: MovementType.Optimove,
            speed: mySpeed,
            acceleration: myAcceleration,
            optiMoveSpeed: myOptiMoveSpeed,
            optiMoveAcceleration: myOptiMoveAcceleration
        };
    
        // Create the motion profile object
        const myMotionProfile: MotionProfile = {
            isDefault: false,
            profile: myVar,
            parameters: myParameters
        };
    
        // Fetch the motion profile node and push the new profile
        this.applicationAPI.applicationService.getApplicationNode("ur-motion-profiles").then(res =>{
            this.motionProfileNode = res as MotionProfilesNode;

            // check whether myMotionProfile exist
            const profileExists = this.motionProfileNode.moveProfiles.joint.some(
                // Iterate through the existing list and compare the 
                // profile.name of each element with the target name
                existingProfile => existingProfile.profile?.name === myMotionProfile.profile.name
            );
            
            // Add to joint profiles
            if(!profileExists){
                this.motionProfileNode.moveProfiles.joint.push(myMotionProfile);
            }
            // console.log("Updated motion profiles: ", this.motionProfileNode.moveProfiles.joint);
        });

        this.saveNode();
    }

    // call saveNode to save node parameters
    saveNode() {
        this.cd.detectChanges();
        this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
    }
}
