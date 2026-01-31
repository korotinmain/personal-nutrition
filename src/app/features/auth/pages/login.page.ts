import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { GoogleLoginButtonComponent } from '../components/google-login-button';
import { supabase } from '../../../core/auth/supabase.client';

@Component({
  selector: 'app-login',
  imports: [GoogleLoginButtonComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly authService = inject(AuthService);

  readonly supabase = supabase;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  async signInWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage.set(
        'Failed to sign in with Google. Please try again or contact support if the problem persists.',
      );
      this.isLoading.set(false);
    }
  }
}
