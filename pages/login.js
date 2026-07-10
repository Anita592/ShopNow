import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
 
export default function LoginScreen() {
  const { data: session } = useSession();
 
  const router = useRouter();
  const { redirect } = router.query;
 
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
 
  return (
    <Layout title="Login">
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-6 mb-6 text-center shadow-md">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-gray-700 mt-1">
              Sign in to continue shopping on ShopNow.
            </p>
          </div>
 
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  id="email"
                  autoFocus
                ></input>
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
 
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: {
                      value: 6,
                      message: 'password is more than 5 chars',
                    },
                  })}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  id="password"
                ></input>
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
 
              <button
                type="submit"
                className="w-full bg-amber-300 hover:bg-amber-400 transition text-black font-semibold px-6 py-3 rounded-lg"
              >
                Login
              </button>
 
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  href={`/register?redirect=${redirect || '/'}`}
                  className="text-amber-600 font-medium hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}