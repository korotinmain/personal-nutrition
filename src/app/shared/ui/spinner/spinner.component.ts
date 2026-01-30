import { Component, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-spinner',
  template: `
    <svg
      [class]="spinnerClasses()"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  `,
  styles: ``,
})
export class SpinnerComponent {
  class = input<string>('');
  size = input<'sm' | 'md' | 'lg'>('md');

  spinnerClasses = (): string => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    return cn('animate-spin', sizeClasses[this.size()], this.class());
  };
}
