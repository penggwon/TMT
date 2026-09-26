import type {Signal} from '../domain/types';
export function contextEstimator(s:Signal){return Math.round((s.repository?10000:s.code?2400:350)*(s.staged?.4:1)*(s.bounded?.75:1));}
