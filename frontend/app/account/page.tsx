'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { useMeQuery } from '@/lib/queries/auth';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AccountProfilePage() {
  const storedUser = useAuthStore((s) => s.user);
  const { data: user } = useMeQuery(true);
  const profile = user ?? storedUser;

  if (!profile) return null;

  return (
    <div>
      <SectionHeading eyebrow="My Account" title="Profile" />
      <div className="mx-auto max-w-md space-y-4 rounded-xl border border-neutral-100 p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Name</p>
          <p className="text-sm font-medium text-neutral-800">{profile.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Email</p>
          <p className="text-sm font-medium text-neutral-800">{profile.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Phone</p>
          <p className="text-sm font-medium text-neutral-800">{profile.phone}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-400">Phone Verified</p>
          <p className="text-sm font-medium text-neutral-800">{profile.is_verified ? 'Yes' : 'Not yet verified'}</p>
        </div>
      </div>
    </div>
  );
}
