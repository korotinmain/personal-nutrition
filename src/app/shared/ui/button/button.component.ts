import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  class = input<string>('');

  clicked = output<void>();

  buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
    };

    return cn(baseClasses, variantClasses[this.variant()], sizeClasses[this.size()], this.class());
  });

  handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }
}
