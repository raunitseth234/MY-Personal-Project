'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Address, AddressCreate } from '@/lib/api/types';

const schema = z.object({
  full_name: z.string().min(2, 'Enter the recipient name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  address_line: z.string().min(5, 'Enter the full address'),
  city: z.string().min(2, 'Enter a city'),
  state: z.string().min(2, 'Enter a state'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  is_default: z.boolean().optional(),
});

interface Props {
  initial?: Address;
  onSubmit: (data: AddressCreate) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function AddressForm({ initial, onSubmit, onCancel, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressCreate>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? { is_default: false },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl border border-neutral-100 p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-neutral-500">Full Name</label>
          <input {...register('full_name')} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
          {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs text-neutral-500">Phone</label>
          <input {...register('phone')} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-neutral-500">Address</label>
        <textarea {...register('address_line')} rows={2} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
        {errors.address_line && <p className="mt-1 text-xs text-red-600">{errors.address_line.message}</p>}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs text-neutral-500">City</label>
          <input {...register('city')} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs text-neutral-500">State</label>
          <input {...register('state')} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
          {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs text-neutral-500">Pincode</label>
          <input {...register('pincode')} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold" />
          {errors.pincode && <p className="mt-1 text-xs text-red-600">{errors.pincode.message}</p>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600">
        <input type="checkbox" {...register('is_default')} className="rounded border-neutral-300" />
        Set as default address
      </label>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-maroon px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-maroon-dark active:scale-95 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving…' : 'Save Address'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-neutral-200 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-600 transition hover:border-maroon hover:text-maroon"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
