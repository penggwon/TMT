# 토큰 모아 태산 design — implementation authority

## Reference lock
Primary: user's Apple / Linear midpoint brief: precise light working surface, neutral white cards, fine borders, blue action accent. Refero live lookup unavailable (subscription); bundled Typography and Craft Details guides used for readable sizing, native form labels, visible focus, touch targets and tabular numbers. Direct implementation requested by user; no visual-option approval gate.

Preserve: off-white canvas, single sans family, restrained blue, large tabular result numbers, step labels, compact top navigation, spacious prompt editor. Distinctive detail: a five-segment usage strip ties the result to the cost breakdown. No decorative imagery needed for this calculator.

## Decision ledger
- Working interface above fold: brief §6 and Sites work-surface guidance.
- Provider radio cards and dependent model/plan selectors: brief §7–10.
- Left editor + right estimate desktop: brief §25; vertical cards mobile.
- Unknown allowance shown honestly: brief §16, no fictional donut percentage.
- System sans, 16px body, 14px labels: Refero typography/craft.
- Bottom navigation below 768px, 44px minimum controls: brief §24–25.

## Tokens
Canvas #f7f8fa; surface #fff; text #20242d; secondary #626b7a; border #e4e7ed; accent #3859dc; accent-light #edf1ff; success #218260; warning #a66715; danger #b43d42.
Spacing 4/8/12/16/24/32/48/64px. Radii 8px inputs, 12px cards, 20px major panels. Shadow 0 4px 24px rgba(25,35,60,.035). One system sans family. Sizes 12px metadata, 14px labels, 16px body, 20px section, 32–44px headline, 48px result. Weights 400/500/600/700. Reduced motion supported.

## Layout
Maximum 1180px shell, 760px input column + 360px estimate column. 24px gap. At <1000px stack result; at <768px hide top nav, show bottom nav and full-width cards; at <480px stack selects and compact section padding. No horizontal scrolling. Min width tested 360px; supports 320px.

## Components / state
Use installed Button, Select, RadioGroup, Progress, Tooltip, Dialog/Sheet when needed, Sonner; semantic cards, textarea and fields composed consistently. Empty result before analysis; live count is explicitly estimated. Toast for saved/copy; error inline for validation. Navigation via URL query. Stale result replaced by explicit re-analysis. All source strings are rendered as text. Future auth uses real provider integration, no dummy login.

## 2026-09-27 revision
Brand: 토큰 모아 태산. Hero: 토큰 모아 부자되자. Subtitle: 잘 쓴 프롬프트 하나 열 토큰 안부럽다. Remove upper AI Usage Calculator label. Mobile bottom navigation contains calculator/history only; desktop settings remain. Results heading: 토큰을 줄이는 방법. Add a plain-language 3-part token explanation (sent text, additional reading, answer) with actual result numbers, range and distinction from usage index. Model picker uses official names, source links and verified date; heuristic estimation is disclosed separately.
