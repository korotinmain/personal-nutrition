import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-google-login-button',
  imports: [SpinnerComponent],
  templateUrl: './google-login-button.html',
  styleUrl: './google-login-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleLoginButtonComponent {
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  clicked = output<void>();

  handleClick(): void {
    this.clicked.emit();
  }
}
