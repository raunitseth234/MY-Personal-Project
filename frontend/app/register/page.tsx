'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuthActions } from '@/lib/hooks/useAuthActions';
import { isApiError } from '@/lib/api/http';

const baseSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
});

const schema = baseSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: doRegister } = useAuthActions();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      await doRegister({ name: data.name, email: data.email, phone: data.phone, password: data.password });
      toast.success('Account created — welcome!');
      router.push('/');
    } catch (err) {
      if (isApiError(err)) {
        if (err.fieldErrors) {
          for (const [field, message] of Object.entries(err.fieldErrors)) {
            if (field in baseSchema.shape) setError(field as keyof FormValues, { message });
          }
        }
        setServerError(err.code === 'DUPLICATE' ? 'An account with this email or phone already exists.' : err.message);
      } else {
        setServerError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">Join Us</p>
          <h1 className="mt-2 font-serif text-3xl text-maroon">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-700">Full Name</label>
            <input
              {...register('name')}
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">Email</label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">Phone</label>
            <input
              {...register('phone')}
              type="tel"
              autoComplete="tel"
              placeholder="9876543210"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">Password</label>
            <input
              {...register('password')}
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          {serverError && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-maroon py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-maroon-dark active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-maroon underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
