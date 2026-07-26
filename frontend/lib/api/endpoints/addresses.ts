import { http } from '@/lib/api/http';
import type { Address, AddressCreate } from '@/lib/api/types';

export const addressesApi = {
  list: () => http.get<Address[]>('/addresses'),
  create: (data: AddressCreate) => http.post<Address>('/addresses', data),
  update: (id: string, data: AddressCreate) => http.put<Address>(`/addresses/${id}`, data),
  delete: (id: string) => http.delete<{ message: string }>(`/addresses/${id}`),
};
