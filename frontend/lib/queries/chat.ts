import { useMutation, useQuery } from '@tanstack/react-query';
import { chatApi } from '@/lib/api/endpoints/chat';

export function useChatHistoryQuery(sessionId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['chat', 'history', sessionId],
    queryFn: () => chatApi.history(sessionId),
    enabled: enabled && !!sessionId,
  });
}

export function useChatMutation() {
  return useMutation({
    mutationFn: ({ sessionId, message }: { sessionId: string; message: string }) =>
      chatApi.send(sessionId, message),
  });
}
