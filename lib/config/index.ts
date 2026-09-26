import raw from './catalog.json';
import type {Provider,Model,Plan,UserSetup} from '../domain/types';
export const providers=raw.providers as Provider[];
export const models=raw.models as Model[];
export const plans=raw.plans as Plan[];
export const defaultSetup:UserSetup={id:'default',name:'My setup',providerId:providers[0].id,modelId:models[0].id,planId:'openai-plus',allowance:null,allowanceUnit:'tokens',pointsPerCredit:null};

// Preserve last provider/plan/budget when replacing the original sample profiles.
export function migrateSetup(setup:UserSetup):UserSetup {
 const legacy=['openai-balanced','openai-reasoning','anthropic-balanced','anthropic-reasoning'];
 return legacy.includes(setup.modelId)?{...setup,modelId:models.find(m=>m.providerId===setup.providerId&&m.active)?.id||defaultSetup.modelId}:setup;
}
