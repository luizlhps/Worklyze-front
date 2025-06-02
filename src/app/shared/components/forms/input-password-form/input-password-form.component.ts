import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'input-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, NgClass],
  templateUrl: './input-password-form.component.html',
  styleUrl: './input-password-form.component.css',
})
export class InputPasswordFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() formId!: string;
  @Input() feedback: boolean = false;
  @Input() toggleMask: boolean = true;
  @Input() placeholder!: string;
  @Input() size!: 'small' | 'large';
  @Input() autocomplete: 'off' | 'on' = 'off';
}
