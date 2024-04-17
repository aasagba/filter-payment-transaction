import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentApiService } from './api/payment.api.service';
import { catchError, Observable, of } from 'rxjs';
import {
  defaultPaymentResponse,
  PaginatedAPIResponse,
  PaymentTransactionDto,
} from './models/model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private apiService = inject(PaymentApiService);

  vm$: Observable<PaginatedAPIResponse<PaymentTransactionDto>>;

  ngOnInit(): void {
    this.vm$ = this.apiService.getPayments().pipe(
      catchError(err => {
        console.error(`An error has occurred: ${err}`);
        return of(defaultPaymentResponse);
      })
    );
  }
}
