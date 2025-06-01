import { Component, inject } from '@angular/core';
import { CommonModule, NgIf, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { take, finalize } from 'rxjs';
import { Message } from 'primeng/message';
import { AuthService } from '../../_auth/_service/auth.service';
import { AuthRequest } from '../../_auth/_dto/auth-request';
import { customExceptionHandler } from '../../shared/utils/custom-exception-handler';
import { genericErrorHandler } from '../../shared/utils/generic-error-handler';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  imports: [CommonModule, InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, Message, ProgressSpinnerModule, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  msgError?: string;

  protected authForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required /* Validators.minLength(8) */]],
  });

  private clearError() {
    this.msgError = undefined;
  }

  handleLogin() {
    this.authForm.markAllAsTouched();
    this.msgError = undefined;

    if (this.authForm.valid) {
      this.loading = true;

      const loginRequestDto: AuthRequest = {
        email: this.authForm.controls.username.value?.toLocaleUpperCase() ?? '',
        password: this.authForm.controls.password.value ?? '',
      };

      this.authService
        .login(loginRequestDto)
        .pipe(
          take(1),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => genericErrorHandler(err, this.setMsgErro),
        });
    }
  }
  setMsgErro = (msg: string) => {
    this.msgError = msg;
  };

  authGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
