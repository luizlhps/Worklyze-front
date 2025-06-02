import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'input-text-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgClass],
  templateUrl: './input-text-form.component.html',
  styleUrl: './input-text-form.component.css',
})
export class InputTextFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() formId!: string;
  @Input() readOnly!: boolean;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() size!: 'small' | 'large';
  @Input() autocomplete: 'off' | 'on' = 'off';
}
