import { RouteToNavigate } from './../../shared/enum/route-to-navigate-enum';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputPasswordFormComponent } from '../../shared/components/forms/input-password-form/input-password-form.component';
import { InputTextFormComponent } from '../../shared/components/forms/input-text-form/input-text-form.component';
import { take, finalize } from 'rxjs';
import { AuthRequest } from '../../_auth/_dto/auth-request';
import { AuthService } from '../../_auth/_service/auth.service';
import { genericErrorHandler } from '../../shared/utils/generic-error-handler';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    Message,
    ProgressSpinnerModule,
    DividerModule,
    InputTextFormComponent,
    InputPasswordFormComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  RouteToNavigate = RouteToNavigate;

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
        email: this.authForm.controls.username.value ?? '',
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
