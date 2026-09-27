import type {Signal} from '../domain/types';
// Future output cannot be tokenized yet. These are declared planning assumptions.
export function outputEstimator(text:string,s:Signal){
 const explicit=text.match(/(?:답변|응답|출력)[^\n.!?]{0,24}?(\d+)\s*토큰|(?:max(?:imum)?|up to|at most)\s*(\d+)\s*tokens/i);
 if(explicit)return Math.min(100000,Math.max(1,Number(explicit[1]||explicit[2])));
 const words=text.match(/(?:max(?:imum)?|up to)?\s*(\d+)\s*(words|단어)/i);
 if(words)return Math.min(100000,Math.max(1,Math.ceil(Number(words[1])*(/[가-힣]/.test(text)?2:4/3))));
 return Math.round((s.code?2400:900)*(s.bounded?.45:1)*(s.staged?.6:1));
}
