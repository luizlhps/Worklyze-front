import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
  selector: 'input-number-form',
  imports: [ReactiveFormsModule, InputNumberModule, NgClass],
  templateUrl: './input-number-form.component.html',
  styleUrl: './input-number-form.component.css',
})
export class InputNumberFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label!: string;
  @Input() minFractionDigits!: string;
  @Input() useGrouping!: boolean;
  @Input() size!: 'small' | 'large';
  @Input() autocomplete: 'off' | 'on' = 'off';
  @Input() maxFractionDigits!: string;
  @Input() mode: 'decimal' | 'currency' = 'currency';
  @Input() formId!: string;
  @Input() placeholder!: string;
  @Input() currency: string = 'BRL';

  @Output() onBlur: EventEmitter<Event> = new EventEmitter();
}
