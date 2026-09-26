# 토큰 모아 태산 MVP

## Goal
Know before you prompt. 사용자가 프롬프트를 실행하기 전에 예상 작업량과 절약 방법을 확인한다.

## Delivery / stack
React + TypeScript, Next.js App Router compatible Vinext runtime, Tailwind and shared Radix primitives. Sites starter chosen for a deployable Cloudflare Worker; browser-local analysis requires no server or AI key. Portable domain modules can later be shared with Expo. Korean first UI; product tagline retained in English.

## Required flow
Provider → model → plan → locally saved setup → prompt → estimated result → editable optimization → copy / re-analyze. Calculator, local History and Settings are real navigable views. Guests can use everything in phase one. Storage is explicitly device-local, not account sync.

## Integrity rules
Never invent provider quotas. Model identities, standard API rates, and context windows are source-verified; estimation weights remain explicitly heuristic. Plan labels are user-requested configuration examples, not a statement of current availability. No percentage for dynamic plans. Custom token budgets compare estimated input + context + visible output tokens, not weighted usage points. Credits require an explicit user supplied points-per-credit conversion; such conversion is a user assumption, not provider truth. API USD cost remains unavailable when rates are null. Usage points are an internal relative index, never subscription credits.

## Scope
Local engine, score, breakdown, risk reasons, tools, optimization, token/custom budget percentages, draft/setup/history persistence, responsive accessible UI. History captures immutable config/setup + analysis snapshots. Optimizer preserves original request and adds staged instructions; reduced stage scope is explicitly disclosed. No invented file names.

## Deferred
Supabase email/Google auth, cloud history and multiple setups, feedback calibration, verified price feeds, real tokenizer adapters, PWA/offline service worker, native app. Auth UI must not pretend to authenticate.

## Acceptance
Works without API keys; empty/oversized prompts rejected; invalid budgets rejected; provider change resets incompatible models/plans; storage failure handled; result tied to analyzed setup; optimized prompt editable/copyable; browser navigation and reload survive; 360/768/1440 widths; typecheck + production build + deterministic engine tests.

2026-09-27: Mobile settings navigation removed; desktop settings preserved. Plain-language token explanation added. Deployment target changed to user-owned Cloudflare Workers and GitHub.
