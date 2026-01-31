import { Component, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
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
