import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addressesApi } from '@/lib/api/endpoints/addresses';
import type { AddressCreate } from '@/lib/api/types';

export function useAddressesQuery(enabled = true) {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressesApi.list(),
    enabled,
  });
}

function useInvalidateAddresses() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['addresses'] });
}

export function useCreateAddressMutation() {
  const invalidate = useInvalidateAddresses();
  return useMutation({
    mutationFn: (data: AddressCreate) => addressesApi.create(data),
    onSuccess: invalidate,
  });
}

export function useUpdateAddressMutation() {
  const invalidate = useInvalidateAddresses();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddressCreate }) => addressesApi.update(id, data),
    onSuccess: invalidate,
  });
}

export function useDeleteAddressMutation() {
  const invalidate = useInvalidateAddresses();
  return useMutation({
    mutationFn: (id: string) => addressesApi.delete(id),
    onSuccess: invalidate,
  });
}
