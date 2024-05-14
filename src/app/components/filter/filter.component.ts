import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../models/model';
import { CommonModule } from '@angular/common';
import {
  ClrInputModule,
  ClrNavigationModule,
  ClrSelectModule,
  ClrVerticalNavModule,
} from '@clr/angular';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  filterIcon,
  timesIcon,
  filterOffIcon,
} from '@cds/core/icon';

ClarityIcons.addIcons(filterIcon, timesIcon, filterOffIcon);

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClrInputModule,
    ClrVerticalNavModule,
    ClrNavigationModule,
    ClrSelectModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Input() status: Status[];
  @Output() applyFilter = new EventEmitter<FormGroup>();
  @Output() resetFilter = new EventEmitter();

  form: FormGroup;

  ngOnInit(): void {
    this.setupFilterForm();
  }

  applyFiltering() {
    this.applyFilter.emit(this.form);
  }

  resetFiltering() {
    this.resetFilter.emit();
  }

  setupFilterForm() {
    this.form = new FormGroup({
      createdAtStart: new FormControl(null),
      createdAtEnd: new FormControl(null),
      status: new FormControl(null),
    });
  }
}
