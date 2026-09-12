import { StitchAiDesignEntityBase } from '../StitchAiDesignEntityBase';
import type { StitchAiDesignSDK } from '../StitchAiDesignSDK';
import type { Control } from '../types';
import type { DesignGeneration, DesignGenerationCreateData } from '../StitchAiDesignTypes';
declare class DesignGenerationEntity extends StitchAiDesignEntityBase<DesignGeneration> {
    constructor(client: StitchAiDesignSDK, entopts: any);
    make(this: DesignGenerationEntity): DesignGenerationEntity;
    create(this: any, reqdata?: DesignGenerationCreateData, ctrl?: Control): Promise<DesignGenerationEntity>;
}
export { DesignGenerationEntity };
