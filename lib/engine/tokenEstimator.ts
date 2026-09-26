// Unicode-aware heuristic, not a model tokenizer. Visible text only.
export function tokenEstimator(text:string){const cjk=(text.match(/[\u3000-\u9fff\uac00-\ud7af]/g)||[]).length;const rest=Array.from(text).length-cjk;return text.trim()?Math.ceil(cjk*1.5+rest/4):0;}
