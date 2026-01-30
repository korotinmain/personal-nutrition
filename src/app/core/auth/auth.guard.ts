import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionStore } from './session.store';

/**
 * Protects routes that require authentication (JWT token from Supabase).
 * Redirects to /login if no valid session exists.
 */
export const authGuard: CanActivateFn = async () => {
  const sessionStore = inject(SessionStore);
  const router = inject(Router);

  // Wait for Supabase to check/restore the session from storage
  await sessionStore.waitForInit();

  // Check if user has valid JWT token
  if (sessionStore.isAuthenticated()) {
    return true;
  }

  // No valid token, redirect to login
  return router.createUrlTree(['/login']);
};
