import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
 
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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
 
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
    <Layout title="Create Account">
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-r from-amber-300 to-amber-100 rounded-2xl p-6 mb-6 text-center shadow-md">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-sm text-gray-700 mt-1">
              Join ShopNow and start shopping today.
            </p>
          </div>
 
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </div>
                )}
              </div>
 
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
 
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Please enter confirm password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 chars',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="text-red-500 text-sm mt-1">
                      Password do not match
                    </div>
                  )}
              </div>
 
              <button
                type="submit"
                className="w-full bg-amber-300 hover:bg-amber-400 transition text-black font-semibold px-6 py-3 rounded-lg"
              >
                Register
              </button>
 
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href={`/login?redirect=${redirect || '/'}`}
                  className="text-amber-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}