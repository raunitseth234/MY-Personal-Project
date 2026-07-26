import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/endpoints/auth';

export function useMeQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    enabled,
  });
}
