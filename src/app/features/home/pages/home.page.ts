import { Component, inject } from '@angular/core';
import { SessionStore } from '../../../core/auth/session.store';
import { CardComponent } from '../../../shared/ui/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly sessionStore = inject(SessionStore);

  getUserName(): string {
    const user = this.sessionStore.user();
    return user?.email?.split('@')[0] || 'there';
  }
}
