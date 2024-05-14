import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PAGINATION_DEFAULT_SIZE, Status, VM } from './models/model';
import { ClrDatagridModule, ClrNavigationModule } from '@clr/angular';
import { PaymentService } from './services/payment.service';
import { FilterComponent } from './components/filter/filter.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClrDatagridModule,
    FilterComponent,
    ClrNavigationModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private paymentService = inject(PaymentService);

  vm$: Observable<VM>;
  loading$: Observable<boolean>;

  headers = [
    'Payment ID',
    'Status',
    'Amount',
    'Currency',
    'Description',
    'Created At',
  ];
  status: Status[] = ['CAPTURED', 'COMPLETED', 'CREATED', 'FAILED', 'SETTLED'];

  ngOnInit(): void {
    this.vm$ = this.paymentService.getPaymentTransactions();
    this.loading$ = this.paymentService.loading$;
  }

  applyPaging(page: number, vm: VM) {
    if (vm.hasNext)
      this.paymentService.filter$.next({
        ...this.paymentService.filter$.value,
        page: page - 1,
        size: PAGINATION_DEFAULT_SIZE,
      });
  }

  onApplyFiltering(form: FormGroup) {
    this.paymentService.filter$.next({
      ...this.paymentService.filter$.value,
      page: 0,
      createdAtStart: form.controls['createdAtStart'].value,
      createdAtEnd: form.controls['createdAtEnd'].value,
      status: form.controls['status'].value,
    });
  }

  onResetFiltering() {
    this.paymentService.filter$.next(null);
  }
}
