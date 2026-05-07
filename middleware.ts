export { auth as middleware } from './src/auth'

export const config = {
  matcher: [
    /*
     * Protect all routes under /(bookmarks) and redirect
     * unauthenticated users to /sign-in.
     * Exclude API routes, static files, and auth pages.
     */
    '/((?!api/auth|sign-in|sign-up|_next/static|_next/image|favicon.ico).*)',
  ],
}
