import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'토큰 모아 태산 — AI 프롬프트 사용량 계산기',description:'잘 쓴 프롬프트 하나 열 토큰 안부럽다. AI 프롬프트의 예상 토큰과 줄이는 방법을 확인하세요.',openGraph:{title:'토큰 모아 태산 — 토큰 모아 부자되자',description:'AI 프롬프트의 예상 사용량을 확인하고 더 가볍게 실행하세요.'},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>;}
