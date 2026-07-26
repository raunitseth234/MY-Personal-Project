import { CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import type { Address } from '@/lib/api/types';

interface Props {
  address: Address;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AddressCard({ address, selectable, selected, onSelect, onEdit, onDelete }: Props) {
  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className={`rounded-xl border p-4 transition ${
        selectable ? 'cursor-pointer' : ''
      } ${selected ? 'border-maroon bg-ivory/60' : 'border-neutral-200'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-neutral-800">{address.full_name}</p>
            {address.is_default && (
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold-dark">
                Default
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-500">{address.address_line}</p>
          <p className="text-sm text-neutral-500">
            {address.city}, {address.state} – {address.pincode}
          </p>
          <p className="mt-1 text-sm text-neutral-500">Phone: {address.phone}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {selectable && selected && <CheckCircle2 className="h-5 w-5 text-maroon" />}
          {onEdit && (
            <button
              aria-label="Edit address"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="rounded-full p-1.5 text-neutral-400 transition hover:bg-ivory hover:text-maroon"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              aria-label="Delete address"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="rounded-full p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
