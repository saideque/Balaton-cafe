import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for those starting with /api, /_next, /_vercel
  // or containing a dot (static files such as /images/hero.png).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
