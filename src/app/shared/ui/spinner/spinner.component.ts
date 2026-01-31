import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  class = input<string>('');
  size = input<'sm' | 'md' | 'lg'>('md');

  spinnerClasses = computed(() => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    return cn('animate-spin', sizeClasses[this.size()], this.class());
  });
}
