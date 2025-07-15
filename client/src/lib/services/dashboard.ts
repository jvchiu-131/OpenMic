import Cookies from 'js-cookie';

export const getDashboardData = async () => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return res.json();
};
