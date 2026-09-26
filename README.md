# 토큰 모아 태산

서비스: https://token-moa-taesan.penggwon10.workers.dev

GitHub 대상 저장소: https://github.com/penggwon/TMT

한국어 중심의 반응형 AI 프롬프트 사용량 계산기. 외부 AI API 없이 브라우저에서 분석합니다.

## 구현
- ChatGPT / Claude 선택, 공식 모델 목록과 데이터 기반 요금제 선택
- 기본 환경 및 초안 저장, LocalStorage 최근 30개 기록, 결과 다시 보기
- 한글/영문 입력 토큰 추정, 범위·컨텍스트·출력·추론·도구 분석
- 예상 상대 사용량 범위, 사용자 예산 비율, 내부 효율 점수와 원인 설명
- 편집 가능한 단계별 최적화, 복사, 재분석
- 모바일 하단 탐색, 데스크톱 2열, 키보드 포커스, 오류 안내

## 기술 스택 / 구조
React + TypeScript + Tailwind + Radix, Next.js App Router 호환 Vinext, Cloudflare Workers 배포. Supabase는 2차 단계로 남겨두어 키 없이 MVP를 실행할 수 있습니다.

```
app/                 페이지, SEO 메타데이터, 디자인 토큰/CSS
components/          제품 UI와 공통 UI primitives
lib/config/          catalog.json (providers / models / plans)
lib/domain/          Entity 타입, Zod 검증
lib/engine/          token / complexity / context / output / cost / usage
lib/services/        promptOptimizer, local storage
 tests/              계산 단위·경계 테스트
PRODUCT.md           제품 범위 및 성공 기준
DESIGN.md            유일한 구현 디자인 기준
```

## 계산 로직
입력 토큰: 한중일/한글 문자 × 1.5 + 나머지 Unicode 문자 ÷ 4. 실제 tokenizer가 아닌 추정치입니다. 문맥, 출력, 추론, 도구는 정규식 기반 작업 신호와 공개된 코드의 휴리스틱 상수로 계산합니다.

내부 사용량 지수 = (입력 토큰 + 예상 컨텍스트 + 예상 출력 + 추론 가중치 + 도구 가중치) / 100. 범위는 중앙 추정 × 0.7~1.4이며, 통계적으로 보정된 신뢰구간이 아닙니다. 내부 지수는 구독 크레딧이나 API 가격이 아닙니다.

- 토큰 예산 비율: (입력 + 컨텍스트 + 응답) / 사용자 토큰 예산.
- 크레딧 비율: 지수 / 사용자가 입력한 1크레딧당 지수 / 남은 크레딧.
- 공개되지 않은 플랜: 비율 없음. Low~Very high 상대 등급만 제공.
- API USD 비용: 공식 입력·출력 단가가 모두 있을 때만 일반 텍스트 비용으로 계산.
- 최적화: 원문 + 단계/출력 제한. 첫 단계만 비교하므로 전체 작업 절약을 보장하지 않습니다. 파일명이나 사실을 생성하지 않습니다. 분석 범위를 줄이는 제안은 사용자가 검토해야 합니다.

## 공식 모델 데이터와 추정 로직
`lib/config/catalog.json`에 GPT-6 Astra/Sol/Luna, Claude Fable 5.1/Opus 5.5/Sonnet 5/Haiku 4.5를 등록했습니다. 공식 모델명, 일반 API 입력·출력 단가(USD/백만 토큰), context window 및 출처는 2026-09-27 확인했습니다.

- OpenAI: https://developers.openai.com/api/docs/models
- Claude: https://platform.claude.com/docs/en/models/overview

GPT6-Astra Light라는 별도 모델 ID는 확인되지 않아 추가하지 않았습니다. API 목록과 실제 ChatGPT/Claude 앱의 모델 선택기는 다를 수 있습니다. 계정·요금제별 사용 가능 여부는 별도 확인해야 합니다.

계산 가중치와 범위는 자체 휴리스틱이며 실제 측정값이 아닙니다. 모든 모델에 동일한 기준 가중치를 적용하여 확인되지 않은 모델별 토큰 소비 차이를 만들지 않습니다. 요금제 한도는 미확인 null을 유지합니다. API 예상 금액은 일반 입력·출력 텍스트에만 해당하며 추론·도구·캐시·구독 비용을 포함하지 않습니다.

기존 샘플 프로필로 저장된 설정은 같은 제공사의 실제 기본 모델로 옮깁니다. 과거 분석 기록의 모델/결과 스냅샷은 변경하지 않습니다.

## 실행
Node.js 22.13 이상, npm 필요.

```bash
npm ci
npm run dev
```

개발 서버가 출력하는 주소(기본 `http://localhost:5173`)로 접속합니다.

```bash
npx tsc --noEmit
npx esbuild tests/engine.test.ts --bundle --platform=node --format=esm --outfile=.sites-runtime/engine-test.mjs
node .sites-runtime/engine-test.mjs
npm run build
```

## Cloudflare 및 GitHub 배포
사용자의 Cloudflare Workers 계정에 `token-moa-taesan`으로 배포합니다. 루트 `wrangler.jsonc`가 설정 기준입니다. 이전 Sites URL은 이전 버전이며, 이번 버전은 사용자 계정의 Workers 배포를 사용합니다.

```bash
npx wrangler login
npm run deploy
```

빌드 후 `dist/server/wrangler.json`을 사용해 Worker와 정적 자산을 함께 배포합니다. GitHub 저장소를 Cloudflare Workers Builds에 연결할 때 빌드 명령은 `npm run build`, 배포 명령은 `npx wrangler deploy --config dist/server/wrangler.json`, 루트 디렉터리는 `/`입니다. Node.js 22.13 이상을 사용합니다. API 키나 OAuth 토큰을 저장소에 커밋하지 않습니다.

호환성 날짜는 설치된 런타임에서 검증된 `2026-05-15`를 유지합니다.

## 검증 / 제한
TypeScript, 변경 코드 ESLint, 계산 엔진 경계 테스트, Chromium에서 1440/768/390/320px 반응형 및 주요 흐름을 검증합니다. 분석은 입력 문자열만 사용하므로 이전 대화, 실제 저장소, 첨부 파일, 반복 도구 호출은 알 수 없습니다. 명령 부정문/문맥을 완전히 이해하지 못하는 규칙 기반 MVP입니다.

LocalStorage는 암호화된 계정 저장소가 아닙니다. 저장 공간 차단 시 현재 세션 분석은 가능하며 저장 실패 안내가 표시됩니다. 초안 자동 저장 실패는 현재 입력을 유지합니다.

## 다음 우선순위
1. 공식 catalog 정기 업데이트와 모델 tokenizer 어댑터
2. 실제 사용량 피드백 수집, 휴리스틱 보정/평가 데이터셋
3. Supabase Auth (Email/Google), RLS 적용 클라우드 기록 및 다중 환경
4. 목적 보존을 평가하는 최적화 서비스/API 어댑터
5. PWA와 Expo 공유 엔진 패키지

Auth, 서버 DB, 실제 크레딧 연동, 학습된 예측, PWA 오프라인 동작은 아직 구현하지 않았습니다.
