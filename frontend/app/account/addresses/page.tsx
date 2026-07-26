'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from '@/lib/queries/addresses';
import type { Address, AddressCreate } from '@/lib/api/types';
import AddressCard from '@/components/shop/AddressCard';
import AddressForm from '@/components/shop/AddressForm';
import EmptyState from '@/components/shop/EmptyState';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddressesQuery();
  const createMutation = useCreateAddressMutation();
  const updateMutation = useUpdateAddressMutation();
  const deleteMutation = useDeleteAddressMutation();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);

  const handleSubmit = (data: AddressCreate) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, data },
        {
          onSuccess: () => {
            toast.success('Address updated');
            setEditing(null);
          },
          onError: () => toast.error('Could not update address'),
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Address added');
          setShowForm(false);
        },
        onError: () => toast.error('Could not save address'),
      });
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <SectionHeading eyebrow="Delivery" title="My Addresses" />
        {!showForm && !editing && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 rounded-full bg-maroon px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-maroon-dark active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Address
          </button>
        )}
      </div>

      {(showForm || editing) && (
        <div className="mb-8">
          <AddressForm
            initial={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-neutral-400">Loading addresses…</p>
      ) : !addresses || addresses.length === 0 ? (
        !showForm && <EmptyState title="No addresses saved yet" message="Add an address to keep on your account." />
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => {
                setEditing(address);
                setShowForm(false);
              }}
              onDelete={() => {
                deleteMutation.mutate(address.id, {
                  onSuccess: () => toast.success('Address removed'),
                  onError: () => toast.error('Could not remove address'),
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
