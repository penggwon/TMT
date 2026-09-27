import {migrateSetup} from '../config';
import {setupSchema} from '../domain/validation';
import type {PromptAnalysis,UserSetup} from '../domain/types';
const prefix='promptcost:v1:';
export function readSetup(){try{const raw=localStorage.getItem(prefix+'setup');return raw?setupSchema.parse(migrateSetup(JSON.parse(raw))):null;}catch{return null;}}
export function readHistory():PromptAnalysis[]{try{const v=JSON.parse(localStorage.getItem(prefix+'history')||'[]');return Array.isArray(v)?v.filter(x=>x&&typeof x.id==='string'&&typeof x.prompt==='string'&&['heuristic-1.0','bpe-reference-2.0'].includes(x.engineVersion)&&x.model&&x.plan&&x.setup&&Array.isArray(x.breakdown)&&Array.isArray(x.reasons)&&x.scores).slice(0,30):[];}catch{return [];}}
export function saveSetup(value:UserSetup){localStorage.setItem(prefix+'setup',JSON.stringify(value));}
export function saveHistory(value:PromptAnalysis[]){localStorage.setItem(prefix+'history',JSON.stringify(value.slice(0,30)));}
export function readDraft(){try{return localStorage.getItem(prefix+'draft')||'';}catch{return '';}}
export function saveDraft(value:string){localStorage.setItem(prefix+'draft',value);}
