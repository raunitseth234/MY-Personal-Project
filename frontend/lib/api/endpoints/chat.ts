import { http } from '@/lib/api/http';
import type { ChatHistoryEntry, ChatResponse } from '@/lib/api/types';

export const chatApi = {
  send: (sessionId: string, message: string) =>
    http.post<ChatResponse>('/chat/message', { session_id: sessionId, message }, { auth: false }),

  history: (sessionId: string) =>
    http.get<ChatHistoryEntry[]>(`/chat/history/${sessionId}`, { auth: false }),
};
