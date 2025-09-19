import { ApplicationNode } from '@universal-robots/contribution-api';

export interface VisionTemplateAppNode extends ApplicationNode {
  type: string;
  version: string;
}
