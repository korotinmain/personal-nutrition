import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { SessionStore } from '../../../core/auth/session.store';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly sessionStore = inject(SessionStore);

  showUserMenu = signal(false);
  currentRoute = signal(this.router.url);

  constructor() {
    this.router.events.subscribe(() => {
      this.currentRoute.set(this.router.url);
    });
  }

  toggleUserMenu(): void {
    this.showUserMenu.update((value) => !value);
  }

  async signOut(): Promise<void> {
    this.showUserMenu.set(false);
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getInitials(email: string): string {
    return email.charAt(0).toUpperCase();
  }

  getLinkClasses(isActive: boolean): string {
    const baseClasses = 'py-3 px-1 border-b-2 transition-colors text-sm font-medium';
    if (isActive) {
      return `${baseClasses} border-primary text-foreground`;
    }
    return `${baseClasses} border-transparent text-muted-foreground hover:text-foreground hover:border-muted`;
  }
}
