import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'input-textarea-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaModule, NgClass],
  templateUrl: './input-textarea-form.component.html',
  styleUrl: './input-textarea-form.component.css',
})
export class InputTextAreaFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() formId!: string;
  @Input() rows!: number;
  @Input() cols!: number;
  @Input() autoResize = true;
  @Input() readOnly = false;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() autocomplete: 'off' | 'on' = 'off';
}
