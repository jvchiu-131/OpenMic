import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const url = request.nextUrl.clone();

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
      }

      const user = await res.json();

      // Optionally redirect based on role
      if (request.nextUrl.pathname.startsWith('/dashboard/musician') && user.role !== 'musician') {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
      }

      if (request.nextUrl.pathname.startsWith('/dashboard/client') && user.role !== 'client') {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
      }

    } catch (err) {
      console.error('Middleware auth error:', err);
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
