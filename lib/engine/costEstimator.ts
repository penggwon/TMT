import type {Model} from '../domain/types';
export function costEstimator(input:number,output:number,model:Model){return model.inputTokenRate===null||model.outputTokenRate===null?null:(input*model.inputTokenRate+output*model.outputTokenRate)/1e6;}
