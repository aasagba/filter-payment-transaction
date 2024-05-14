import { inject, Injectable } from '@angular/core';
import { PaymentApiService } from '../api/payment.api.service';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import {
  defaultFilter,
  defaultPaymentResponse,
  PaymentTransactionFilter,
} from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiService = inject(PaymentApiService);

  filter$ = new BehaviorSubject<PaymentTransactionFilter | null>(defaultFilter);

  getPaymentTransactions() {
    return this.filter$.pipe(
      switchMap(filter => {
        return this.apiService.getPayments(filter).pipe(
          catchError(err => {
            console.error(`An error has occurred: ${err}`);
            return of(defaultPaymentResponse);
          })
        );
      })
    );
  }
}
