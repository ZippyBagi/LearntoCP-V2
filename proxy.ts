import createMiddleware from 'next-intl/middleware';
import {routing} from './app/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './app/scripts/supabase/updateSession';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {

  const { supabaseResponse, claims } = await updateSession(request);
  
  if (request.nextUrl.pathname === '/auth/callback') {
    return supabaseResponse;
  }

  const intlResponse = intlMiddleware(request);

  supabaseResponse.cookies.getAll().forEach(cookie => {
      intlResponse.cookies.set(cookie);
  });

  return intlResponse;
}

export const config = {
  matcher: '/((?!api|_next|.*\\..*).*)'
};