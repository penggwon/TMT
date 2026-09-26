import type {Signal} from '../domain/types';
export function complexityEstimator(text:string):Signal {
 const scope=(text.match(/\b(all|entire|every|whole|full)\b|전체|모든/gi)||[]).length;
 const code=/code|file|repository|repo\b|website|코드|파일|웹사이트|구현|테스트/i.test(text);
 const repository=/repository|whole project|entire (website|project)|전체 (프로젝트|코드|웹사이트)|모든 파일/i.test(text);
 const tasks=(text.match(/\b(analy[sz]e|improve|build|test|refactor|design|implement)\b|분석|수정|테스트|구현|설계|개선/g)||[]).length;
 const bounded=/\b(up to|max(?:imum)?|only|at most)\b|최대|이내|만[ .\n]|한 문장|\d+\s*(words|sentences|단어|문장|자)/i.test(text);
 const staged=/do not modify|first step|우선 분석|수정하지|첫 단계/i.test(text);
 const tools:Signal['tools']=[];
 if(code)tools.push({name:repository&&!staged?'Multiple file read':'File read',likelihood:repository?'높음':'보통'});
 if(/search|latest|검색|최신/i.test(text))tools.push({name:'Web search',likelihood:'높음'});
 if(/test|build|execute|실행|테스트|빌드/i.test(text)&&!staged)tools.push({name:'Test / build',likelihood:'높음'});
 if(/browser|브라우저/i.test(text))tools.push({name:'Browser',likelihood:'보통'});
 if(/image|사진|이미지/i.test(text))tools.push({name:'Image analysis',likelihood:'보통'});
 if(/agent|에이전트/i.test(text))tools.push({name:'Agent workflow',likelihood:'보통'});
 if(/api|외부 서비스/i.test(text))tools.push({name:'External API',likelihood:'보통'});
 const value=Math.max(0,scope+Math.min(tasks,4)+(repository?3:0)-(staged?3:0)-(bounded?1:0));
 return {scope,tasks,code,repository,bounded,staged,tools,level:value>=7?'Very high':value>=4?'High':value>=2?'Moderate':'Low'};
}
