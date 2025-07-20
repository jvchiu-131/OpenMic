'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
  if (token && token !== 'undefined' && token !== 'null' && token.trim() !== '') {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
    };

    checkAuth();
  }, [isLoggedIn]);


  const handleLogout = () => {
  Cookies.remove('token');
  router.push('/auth/login'); // optional redirect
};

  return (
    <header className="bg-[#0a0a0a] shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="relative w-28 h-12">
          <Image
            src="/logo.svg"  
            alt="OpenMic"
            fill
            priority
            className='object-contain'
          />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/gigs" className="text-[#d5d4d4] hover:text-blue-600 transition">
              Gigs
            </Link>
          </li>
          <li>
            <Link href="/musicians" className="text-[#d5d4d4]  hover:text-blue-600 transition">
              Musicians
            </Link>
          </li>
          { !isLoggedIn ? (
            <>
              <li>
                <Link href="/auth/login" className="text-[#d5d4d4]  hover:text-blue-600 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-[#d5d4d4]  hover:text-blue-600 transition">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
            <li>
              <Link href="/dashboard/musician" className="text-[#d5d4d4]  hover:text-blue-600 transition">
                Dashboard
              </Link>
            </li> 

             <li>
            <button
            onClick={handleLogout}
            className="text-[#d5d4d4] hover:text-red-500 transition"
            >
            Logout
            </button>
            </li>
            </>
            
          )}
          
        </ul>
      </nav>
    </header>
  );
}
