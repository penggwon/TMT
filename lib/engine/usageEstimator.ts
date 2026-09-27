import {models,plans} from '../config';
import type {UserSetup,PromptAnalysis} from '../domain/types';
import {promptSchema,setupSchema} from '../domain/validation';
import {tokenEstimator} from './tokenEstimator';
import {complexityEstimator} from './complexityEstimator';
import {contextEstimator} from './contextEstimator';
import {outputEstimator} from './outputEstimator';
import {costEstimator} from './costEstimator';
export function usageEstimator(prompt:string,setup:UserSetup):PromptAnalysis {
 prompt=promptSchema.parse(prompt); setup=setupSchema.parse(setup);
 const model=models.find(m=>m.id===setup.modelId)!;const plan=plans.find(p=>p.id===setup.planId)!;
 const s=complexityEstimator(prompt),input=tokenEstimator(prompt),context=setup.contextText!==undefined?tokenEstimator(setup.contextText):contextEstimator(s),output=setup.outputTokens??outputEstimator(prompt,s);
 const reasoning=(input+context+output)*({Low:.08,Moderate:.2,High:.4,'Very high':.65}[s.level])*model.reasoningMultiplier;
 const tool=s.tools.length*(s.staged?180:500);
 const breakdown=[{label:'프롬프트',value:input/100,color:'#ff873e'},{label:'추가 컨텍스트',value:context/100,color:'#c5c5c5'},{label:'예상 응답',value:output/100,color:'#777777'},{label:'추론',value:reasoning/100,color:'#555555'},{label:'도구',value:tool/100,color:'#383838'}];
 const likely=Math.max(.1,breakdown.reduce((n,b)=>n+b.value,0));
 const scores={'명확성':Math.min(95,prompt.length>35?85:60),'작업 범위':Math.max(15,95-s.scope*14-(s.repository?20:0)+(s.staged?20:0)),'컨텍스트 효율':s.repository?35:s.code?65:90,'응답 제어':s.bounded?92:45,'비용 효율':Math.max(15,95-Math.round(likely/3))};
 const reasons=[];
 if(s.scope||s.repository)reasons.push({title:'작업 범위가 넓어요',detail:'전체 또는 여러 파일을 다루는 요청은 추가 컨텍스트를 많이 사용할 수 있어요.',tip:'첫 단계에서 검토할 범위를 구체적으로 지정하세요.'});
 if(!s.bounded)reasons.push({title:'응답 길이가 정해지지 않았어요',detail:'출력 형식과 길이가 없으면 긴 응답이 생성될 수 있어요.',tip:'핵심 항목 최대 5개처럼 출력에 한도를 두세요.'});
 if(s.tasks>2&&!s.staged)reasons.push({title:'여러 작업을 한 번에 요청했어요',detail:'분석, 수정, 테스트를 함께 요청하면 작업이 반복될 수 있어요.',tip:'우선 분석한 뒤 필요한 수정만 별도로 진행하세요.'});
 if(!reasons.length)reasons.push({title:'비교적 구체적인 요청이에요',detail:'큰 비용 증가 요인은 발견하지 못했어요. 이전 대화와 첨부파일은 별도 영향을 줍니다.',tip:'필요한 배경만 제공하고 결과를 확인하며 진행하세요.'});
 const tokenTotal=input+context+output;
 const budgetUnits=setup.allowanceUnit==='tokens'?tokenTotal:setup.pointsPerCredit?likely/setup.pointsPerCredit:null;
 return {id:crypto.randomUUID(),userId:null,prompt,setup:{...setup},model:{...model},plan:{...plan},estimatedInputTokens:input,estimatedContextTokens:context,estimatedOutputTokens:output,reasoningLevel:s.level,toolProbability:s.tools,estimatedMinUsage:likely*.7,estimatedMaxUsage:likely*1.4,estimatedLikelyUsage:likely,planPercentageMin:setup.allowance&&budgetUnits!==null?budgetUnits*.7/setup.allowance*100:null,planPercentageMax:setup.allowance&&budgetUnits!==null?budgetUnits*1.4/setup.allowance*100:null,budgetBasis:setup.allowance?(setup.allowanceUnit==='tokens'?'사용자 입력 토큰 예산 · 입력 + 컨텍스트 + 응답':'사용자 가정 크레딧 환산'):null,efficiencyScore:Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/5),scores,breakdown,signals:s,reasons:reasons.slice(0,3),estimatedApiCost:costEstimator(input+context,output,model),createdAt:new Date().toISOString(),engineVersion:'bpe-reference-2.0'};
}
