'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuthActions } from '@/lib/hooks/useAuthActions';
import { isApiError } from '@/lib/api/http';

const schema = z.object({
  identifier: z.string().min(1, 'Enter your email or phone number'),
  password: z.string().min(1, 'Enter your password'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthActions();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      await login(data.identifier, data.password);
      toast.success('Welcome back!');
      router.push(searchParams.get('returnTo') || '/');
    } catch (err) {
      setServerError(isApiError(err) ? err.message : 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">Welcome Back</p>
          <h1 className="mt-2 font-serif text-3xl text-maroon">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-700">Email or Phone</label>
            <input
              {...register('identifier')}
              type="text"
              autoComplete="username"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.identifier && <p className="mt-1 text-xs text-red-600">{errors.identifier.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">Password</label>
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          {serverError && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-maroon py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-maroon-dark active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          New to Rajesh Jewellers?{' '}
          <Link href="/register" className="font-medium text-maroon underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
