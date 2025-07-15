'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function MusicianDashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

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
        if (result.profile?.role !== 'client') {
          router.push('/auth/login'); // not allowed
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
      <p>this is client</p>
    </div>
  );
}
