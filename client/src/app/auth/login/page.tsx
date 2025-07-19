'use client';

import Image from 'next/image';
import Link from 'next/link';
import loginUser from '@/lib/services/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    setLoading(true);
    setError('');

    const target = e.target as HTMLFormElement & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const res = await loginUser({ email, password });

    if (res.error) {
      setError(res.error);
    } else {
      // Handle successful login, e.g., redirect or show a success message
      localStorage.setItem('token', res.token);

      if (res.role === 'musician') {
        toast.success('Login successful! 👋');
        router.push('/dashboard/musician');
      } else if (res.role === 'client') {
        toast.success('Login successful! 👋');
        router.push('/dashboard/client');
      }else{
        toast.error('Login failed. Please check credentials ❌');
        setError('Invalid role or access denied.');
      }
      
    }
    setLoading(false);
  };



  return (
    <div className=" relative min-h-screen flex bg-[#0a0a0a] text-white ">

      <div className="flex w-full lg:w-1/2 items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-white">Login to your account</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type='email'
                name="email"
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
        <div className="text-sm text-red-400 font-semibold">{error}</div>
      )}

            <button
        type="submit"
        className="w-full py-2 bg-[#0FAC7D] hover:bg-[#0c9a6c] text-black font-semibold rounded-md transition duration-200"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
          </form>

          <p className="text-sm text-gray-400 text-center">
            Don’t have an account?{' '}
            <Link href="/auth/signup" className="text-[#0FAC7D] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      
<div className="hidden lg:flex w-1/2 bg-[#0a0a0a] flex items-center justify-center border-red-800 border-2">

<div>
<div>
      <Image
  src={"/blob.svg"}
  alt="Blob"
  width={700}
  height={700}
  className=" top-0 left-0 opacity-50 rounded-[60%] animate-blob2 mix-blend-screen pointer-events-none"
  />
</div>
<div>
  <Image
  src={"/blob2.svg"}
  alt="Blob"
  width={700}
  height={700}
  className="absolute top-0 right-0  opacity-50  rounded-[70%]  animate-blob2 pointer-events-none"
  />
</div>

<div>
  <Image
  src={"/blob3.svg"}
  alt="Blob"
  width={700}
  height={700}
  className=" bottom-0 left-0  opacity-50  rounded-[65%]  animate-blob3 pointer-events-none" 
  />
</div>


<div>
  <Image
  src={"/blob4.svg"}
  alt="Blob"
  width={700}
  height={700}
  className="absolute bottom-0 right-0  opacity-50  rounded-[55%]  animate-blob4 pointer-events-none"
  />
</div>
</div>
      <div className="flex items-center justify-center border-red-800 border-2 z-10">
        <h1 className="text-5xl font-extrabold text-gray-300">Welcome Back to OpenMic 🎤</h1>
      </div>
      </div>

    </div>
  );
}

export default LoginPage;