import type {PromptOptimization} from '../domain/types';
import {complexityEstimator} from '../engine/complexityEstimator';
// Replace with an API adapter later. Keep bounded, focused requests intact.
export function promptOptimizer(prompt:string):PromptOptimization {
 const korean=/[가-힣]/.test(prompt),signals=complexityEstimator(prompt);
 if(signals.bounded&&(!signals.code||signals.staged))return {originalPrompt:prompt,optimizedPrompt:prompt,method:'local-rules',changes:['이미 응답 범위가 정해진 요청은 그대로 유지']};
 const suffix=signals.code
  ?korean?'\n\n첫 단계: 우선 분석만 진행하세요. 파일을 수정하지 마세요.\n가장 중요한 문제를 최대 5개로 정리하고, 각각 근거와 다음 행동을 간결하게 알려주세요.\n필요한 파일이나 배경이 부족하면 추측하지 말고 먼저 질문하세요.\n나머지 구현 및 테스트는 이 분석을 확인한 뒤 별도 단계로 진행합니다.':'\n\nFirst step: analyze only; do not modify files.\nIdentify up to 5 priority findings, with concise evidence and a recommended next action.\nIf files or context are missing, ask before proceeding.\nDefer implementation and tests until this analysis is reviewed.'
  :korean?'\n\n원래 요청한 결과물을 작성하되, 첫 답변은 최대 150단어로 간결하게 작성해주세요. 필요한 설명이 더 있으면 이어서 요청하겠습니다.':'\n\nProduce the requested deliverable, keeping the first answer to at most 150 words. I will ask for more detail if needed.';
 return {originalPrompt:prompt,optimizedPrompt:prompt+suffix,method:'local-rules',changes:signals.code?['원래 요청을 보존하고 첫 단계를 분석으로 제한','출력을 핵심 항목 5개로 제한','수정과 테스트를 후속 단계로 분리']:['원래 작업을 유지하고 첫 응답 길이만 제한']};
}
