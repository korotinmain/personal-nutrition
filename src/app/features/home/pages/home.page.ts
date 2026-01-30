import { Component, inject } from '@angular/core';
import { SessionStore } from '../../../core/auth/session.store';
import { CardComponent } from '../../../shared/ui/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
    <div class="space-y-6">
      <!-- Welcome Header -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Today</h1>
        <p class="text-muted-foreground mt-1">Welcome back, {{ getUserName() }}!</p>
      </div>

      <!-- Placeholder Content -->
      <div class="grid gap-6 md:grid-cols-2">
        <app-card>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Today's Meals</h3>
            <p class="text-sm text-muted-foreground">
              Your meal plan for today will appear here. This feature is coming soon!
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Quick Stats</h3>
            <p class="text-sm text-muted-foreground">
              Track your nutrition and meal progress. This feature is coming soon!
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Upcoming Meals</h3>
            <p class="text-sm text-muted-foreground">
              Plan your meals for the week ahead. This feature is coming soon!
            </p>
          </div>
        </app-card>

        <app-card>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">Shopping List</h3>
            <p class="text-sm text-muted-foreground">
              Generate shopping lists from your meal plans. This feature is coming soon!
            </p>
          </div>
        </app-card>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomePage {
  readonly sessionStore = inject(SessionStore);

  getUserName(): string {
    const user = this.sessionStore.user();
    return user?.email?.split('@')[0] || 'there';
  }
}
