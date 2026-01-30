import { computed, Injectable, signal } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  private readonly _status = signal<AuthStatus>('loading');
  private readonly _user = signal<User | null>(null);
  private readonly _session = signal<Session | null>(null);
  private _initPromise: Promise<void> | null = null;
  private _initResolve: (() => void) | null = null;

  constructor() {
    this._initPromise = new Promise<void>((resolve) => {
      this._initResolve = resolve;
    });
  }

  readonly status = this._status.asReadonly();
  readonly user = this._user.asReadonly();
  readonly session = this._session.asReadonly();

  readonly isAuthenticated = computed(() => this._status() === 'authenticated');

  setSession(session: Session | null): void {
    this._session.set(session);
    this._user.set(session?.user ?? null);
    this._status.set(session ? 'authenticated' : 'anonymous');

    // Resolve initialization promise if it hasn't been resolved yet
    if (this._initResolve) {
      this._initResolve();
      this._initResolve = null;
    }
  }

  /**
   * Wait for the initial authentication check to complete
   */
  async waitForInit(): Promise<void> {
    if (this._initPromise) {
      await this._initPromise;
    }
  }
}
