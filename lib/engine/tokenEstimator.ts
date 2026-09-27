import {Tiktoken} from 'js-tiktoken/lite';
import o200k from 'js-tiktoken/ranks/o200k_base';
// Reference encoding only: current GPT-6 / Claude model mappings are unverified.
// Keep text local and treat special-token-looking strings as ordinary user content.
let encoder:Tiktoken|undefined;
const cache=new Map<string,number>();
export function tokenEstimator(text:string):number {
 if(!text)return 0;
 const prior=cache.get(text);if(prior!==undefined)return prior;
 encoder??=new Tiktoken(o200k);
 const count=encoder.encode(text,[],[]).length;
 if(cache.size>=8)cache.delete(cache.keys().next().value!);
 cache.set(text,count);return count;
}
