import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionStore } from './session.store';

/**
 * Protects routes that should only be accessible to unauthenticated users (like login page).
 * Redirects to home if user already has a valid JWT token.
 */
export const unauthGuard: CanActivateFn = async () => {
  const sessionStore = inject(SessionStore);
  const router = inject(Router);

  // Wait for Supabase to check/restore the session from storage
  await sessionStore.waitForInit();

  // If user is already authenticated, redirect to home
  if (sessionStore.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  // Not authenticated, allow access to login page
  return true;
};
