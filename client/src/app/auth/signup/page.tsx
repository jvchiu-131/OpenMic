// app/auth/signup/page.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import { registerUser } from '@/lib/services/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const SignupPage = () => {

  const [role, setRole] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement & {
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const username = target.username.value;

    const res = await registerUser({ email, password, username, role });

    if (res.error) {
      console.error('Signup error:', res.error);
    } else {
      toast.success('Signup successful! Please login to continue.');
      router.push('/auth/login');
    }
  };


  
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div className="flex w-full w-full lg:w-1/2 p-8 items-center justify-center rounded-lg shadow-lg px-8 py-12">
        <div className="w-full max-w-md space-y-6">

          <h1 className="text-2xl font-bold">Signup Page</h1>
          <form className="mt-4 space-y-7" onSubmit={handleSignup}>
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label> 
              <input
                type="email"
                name="email"
                className="mt-4 w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Create Password</label> 
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="mt-4 w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm text-gray-300">Re-enter Password</label> 
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="mt-4 w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Username</label> 
              <input
                type="username"
                name="username"
                className="mt-4 w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#0FAC7D]"
                placeholder="john doe"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Role</label> 
              <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`w-1/2 py-2 rounded-md border text-sm font-medium transition duration-200 ${
                  role === 'client'
                    ? 'bg-[#0FAC7D] text-black border-[#0FAC7D]'
                    : 'bg-[#1a1a1a] text-white border-[#333] hover:border-[#555]'
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole('musician')}
                className={`w-1/2 py-2 rounded-md border text-sm font-medium transition duration-200 ${
                  role === 'musician'
                    ? 'bg-[#0FAC7D] text-black border-[#0FAC7D]'
                    : 'bg-[#1a1a1a] text-white border-[#333] hover:border-[#555]'
                }`}
              >
                Musician
              </button>
            </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#0FAC7D] hover:bg-[#0c9a6c] text-black font-semibold rounded-md transition duration-200" 
            >
              Sign Up 
            </button>
          </form>
        </div>
      </div>

      <div className="w-full w-full lg:w-1/2 p-8 items-center justify-center bg-[#1a1a1a] rounded-lg shadow-lg px-8 py-12">  
      </div>
    </div>
  );
}

export default SignupPage;
