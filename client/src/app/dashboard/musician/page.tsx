'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/layout/navbar';
import Footer from '@/app/components/layout/footer';
import RegistrationPage from '@/app/auth/registration/page';

const MusicianDashboard = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return router.push('/auth/login');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (result.profile?.role !== 'musician') {
          router.push('/auth/login'); // not allowed
        }else if (result.profile?.profileCompleted === false){
          setRegistrationComplete(false);
          router.push('/dashboard/musician'); // already registered
        } else {
          setData(result);
        }
      })
      .catch(() => {
        router.push('/auth/login');
      });
  }, [router]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      {!registrationComplete ? (
        <RegistrationPage setRegistrationComplete={setRegistrationComplete} />
      ) : data ? (
        <div>
          <h1>THIS IS MUSICIAN</h1>
          {/* Add more dashboard content here */}
        </div>    
      ):<></>}
      <Footer />
    </div>
  );
}

export default MusicianDashboard;
