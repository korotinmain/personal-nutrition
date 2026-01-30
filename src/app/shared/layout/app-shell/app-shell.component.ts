import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { SessionStore } from '../../../core/auth/session.store';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Top Bar -->
      <header class="border-b border-border bg-card">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <!-- App Title -->
            <h1 class="text-xl font-semibold">Personal Nutrition</h1>

            <!-- User Menu -->
            <div class="relative">
              <button
                (click)="toggleUserMenu()"
                class="flex items-center gap-2 rounded-full hover:opacity-80 transition-opacity"
              >
                @if (sessionStore.user(); as user) {
                  <div
                    class="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium"
                  >
                    {{ getInitials(user.email || '') }}
                  </div>
                }
              </button>

              @if (showUserMenu()) {
                <div
                  class="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg z-50"
                >
                  <div class="p-2">
                    @if (sessionStore.user(); as user) {
                      <div
                        class="px-2 py-1.5 text-sm text-muted-foreground border-b border-border mb-1"
                      >
                        {{ user.email }}
                      </div>
                    }
                    <button
                      (click)="signOut()"
                      class="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="border-b border-border bg-card">
        <div class="container mx-auto px-4">
          <div class="flex gap-6">
            <button (click)="navigateTo('/')" [class]="getLinkClasses(currentRoute() === '/')">
              Today
            </button>
            <button [class]="getLinkClasses(false)" disabled class="cursor-not-allowed opacity-50">
              Plan
            </button>
            <button [class]="getLinkClasses(false)" disabled class="cursor-not-allowed opacity-50">
              Shopping
            </button>
            <button [class]="getLinkClasses(false)" disabled class="cursor-not-allowed opacity-50">
              Settings
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: ``,
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
