import { Component, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-card',
  template: `
    <div [class]="cardClasses()">
      @if (header()) {
        <div class="border-b border-border p-6">
          <ng-content select="[header]"></ng-content>
        </div>
      }
      <div class="p-6">
        <ng-content></ng-content>
      </div>
      @if (footer()) {
        <div class="border-t border-border p-6">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class CardComponent {
  class = input<string>('');
  header = input<boolean>(false);
  footer = input<boolean>(false);

  cardClasses = (): string => {
    return cn(
      'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
      this.class(),
    );
  };
}
