import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase.client';
import { SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly sessionStore: SessionStore = inject(SessionStore);
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await this.initializeAuth();
    this.initialized = true;
  }

  private async initializeAuth(): Promise<void> {
    if (!supabase) {
      console.warn('Supabase not configured. Please add credentials to environment file.');
      this.sessionStore.setSession(null);
      return;
    }

    try {
      // Get initial session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      this.sessionStore.setSession(session);

      // Listen to auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        this.sessionStore.setSession(session);
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.sessionStore.setSession(null);
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured. Please add credentials to environment file.');
    }

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    await this.router.navigate(['/login']);
  }

  async getSession(): Promise<Session | null> {
    if (!supabase) {
      return null;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  }
}
