import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../core/auth/session.store';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { supabase } from '../../../core/auth/supabase.client';

@Component({
  selector: 'app-callback',
  imports: [SpinnerComponent, ButtonComponent],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4"
    >
      <div class="w-full max-w-md">
        <div
          class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-12 text-center"
        >
          @if (isLoading()) {
            <!-- Loading State -->
            <div class="space-y-6">
              <div class="flex justify-center">
                <app-spinner size="lg"></app-spinner>
              </div>
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Signing you in...</h2>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Please wait while we complete your authentication
                </p>
              </div>
            </div>
          } @else if (errorMessage()) {
            <!-- Error State -->
            <div class="space-y-6">
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-red-600 dark:text-red-400">
                  Authentication Failed
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-400">{{ errorMessage() }}</p>
              </div>
              <app-button variant="primary" (clicked)="retryLogin()"> Return to Login </app-button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CallbackPage implements OnInit {
  private readonly sessionStore = inject(SessionStore);
  private readonly router = inject(Router);

  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    if (!supabase) {
      this.isLoading.set(false);
      this.errorMessage.set('Authentication service is not configured.');
      return;
    }

    try {
      console.log('Callback page: Processing authentication...');
      console.log('Current URL:', window.location.href);

      // Check for error in URL params (Supabase puts errors there)
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (errorParam) {
        console.error('OAuth error from URL:', errorParam, errorDescription);
        this.isLoading.set(false);
        this.errorMessage.set(
          errorDescription || errorParam || 'Authentication failed. Please try again.',
        );
        return;
      }

      // Exchange the code in URL for a session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log('Session result:', { session: !!session, error });

      if (error) {
        console.error('Callback error:', error);
        this.isLoading.set(false);
        this.errorMessage.set(error.message || 'Failed to complete authentication.');
        return;
      }

      if (session) {
        console.log('Session found, redirecting to home...');
        // Session is set, wait a moment for the store to update
        this.sessionStore.setSession(session);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      } else {
        console.warn('No session found after callback');
        this.isLoading.set(false);
        this.errorMessage.set(
          'No authentication session found. Please check your Supabase configuration and ensure Google provider is enabled.',
        );
      }
    } catch (error) {
      console.error('Unexpected callback error:', error);
      this.isLoading.set(false);
      this.errorMessage.set('An unexpected error occurred during authentication.');
    }
  }

  retryLogin(): void {
    this.router.navigate(['/login']);
  }
}
