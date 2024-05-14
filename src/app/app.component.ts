import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PAGINATION_DEFAULT_SIZE, VM } from './models/model';
import { ClrDatagridModule } from '@clr/angular';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private paymentService = inject(PaymentService);

  vm$: Observable<VM>;
  headers = ['ID', 'Amount', 'Currency', 'Description', 'Status', 'Created At'];

  ngOnInit(): void {
    this.vm$ = this.paymentService.getPaymentTransactions();
  }

  applyPaging(page: number, vm: VM) {
    if (vm.hasNext)
      this.paymentService.filter$.next({
        ...this.paymentService.filter$.value,
        page: page - 1,
        size: PAGINATION_DEFAULT_SIZE,
      });
  }
}
