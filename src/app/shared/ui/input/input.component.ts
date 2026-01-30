import { Component, input } from '@angular/core';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-input',
  template: `
    <input
      [type]="type()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [class]="inputClasses()"
    />
  `,
  styles: ``,
})
export class InputComponent {
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  class = input<string>('');

  inputClasses = (): string => {
    return cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.class(),
    );
  };
}
