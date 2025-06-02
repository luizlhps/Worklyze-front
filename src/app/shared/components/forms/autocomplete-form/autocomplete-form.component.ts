import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'autocomplete-form',
  imports: [AutoCompleteModule, ReactiveFormsModule, NgClass],
  templateUrl: './autocomplete-form.component.html',
  styleUrl: './autocomplete-form.component.css',
})
export class AutocompleteFormComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() formId!: string;
  @Input() dropdown: boolean = false;
  @Input() placeholder!: string;
  @Input() optionLabel!: string;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number = 40;
  @Input() minLength: number = 1;
  @Input() autocomplete: 'off' | 'on' = 'off';
  @Input() items: any[] = [];
  @Input() size!: 'small' | 'large';

  @Output() search: EventEmitter<AutoCompleteCompleteEvent> = new EventEmitter();
  @Output() onItemSelected: EventEmitter<AutoCompleteSelectEvent> = new EventEmitter();
}
