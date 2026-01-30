import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
      <div class="w-full max-w-md">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``,
})
export class AuthLayoutComponent {}
