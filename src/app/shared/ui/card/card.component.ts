import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  class = input<string>('');
  header = input<boolean>(false);
  footer = input<boolean>(false);

  cardClasses = computed(() => {
    return cn(
      'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
      this.class(),
    );
  });
}
