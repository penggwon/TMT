import type {Signal} from '../domain/types';
export function outputEstimator(text:string,s:Signal){const words=text.match(/(?:max(?:imum)?|up to)?\s*(\d+)\s*(words|단어)/i);if(words)return Math.min(100000,Math.max(1,Number(words[1])*2));return Math.round((s.code?2400:900)*(s.bounded?.45:1)*(s.staged?.6:1));}
