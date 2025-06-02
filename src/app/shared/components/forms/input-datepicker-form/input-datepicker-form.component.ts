import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'input-datepicker-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePickerModule, NgClass],
  templateUrl: './input-datepicker-form.component.html',
  styleUrl: './input-datepicker-form.component.css',
})
export class InputDatepickerFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() formId!: string;
  @Input() iconDisplay!: 'button' | 'input';
  @Input() cols!: number;
  @Input() showIcon = false;
  @Input() showOnFocus = false;
  @Input() showClear = false;
  @Input() appendTo!: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() showButtonBar!: boolean;
  @Input() readOnly!: boolean;
}
