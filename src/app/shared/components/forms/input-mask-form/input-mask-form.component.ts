import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'input-mask-form',
  imports: [ReactiveFormsModule, InputMaskModule, NgClass],
  templateUrl: './input-mask-form.component.html',
  styleUrl: './input-mask-form.component.css',
})
export class InputMaskFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() formId!: string;
  @Input() size!: 'small' | 'large';
  @Input() placeholder!: string;
  @Input() mask: string = '';
}
