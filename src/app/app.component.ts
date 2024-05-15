import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PAGINATION_DEFAULT_SIZE, Status, VM } from './models/model';
import { ClrDatagridModule, ClrNavigationModule } from '@clr/angular';
import { PaymentService } from './services/payment.service';
import { FilterHeaderComponent } from './components/filter-header/filter-header.component';
import { FormGroup } from '@angular/forms';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { PaymentCardsComponent } from './components/payment-cards/payment-cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClrDatagridModule,
    FilterHeaderComponent,
    ClrNavigationModule,
    InfiniteScrollDirective,
    PaymentCardsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private paymentService = inject(PaymentService);

  vm$: Observable<VM>;
  loading$: Observable<boolean>;
  isMobileBreakpoint$: Observable<boolean>;

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
    this.isMobileBreakpoint$ = this.paymentService.isMobileBreakpoint$;
  }

  applyPaging(page: number) {
    this.paymentService.filter$.next({
      ...this.paymentService.filter$.value,
      page: page - 1,
      size: PAGINATION_DEFAULT_SIZE,
    });
  }

  onApplyFiltering(form: FormGroup) {
    this.paymentService.processingFiltering$.next(true);

    this.paymentService.filter$.next({
      ...this.paymentService.filter$.value,
      page: 0,
      createdAtStart: form.controls['createdAtStart'].value,
      createdAtEnd: form.controls['createdAtEnd'].value,
      status: form.controls['status'].value,
    });
  }

  onResetFiltering() {
    this.paymentService.processingFiltering$.next(true);
    this.paymentService.filter$.next(null);
  }

  onInfinityScrollFired(vm: VM) {
    const currentPage = this.paymentService.filter$.value?.page ?? 0;
    if (vm.pagination.hasNext) this.applyPaging(currentPage + 2, vm);
  }
}
