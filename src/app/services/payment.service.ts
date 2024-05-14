import { inject, Injectable } from '@angular/core';
import { PaymentApiService } from '../api/payment.api.service';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
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
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  getPaymentTransactions() {
    return this.filter$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(filter => {
        return this.apiService.getPayments(filter).pipe(
          catchError(err => {
            console.error(`An error has occurred: ${err}`);
            return of(defaultPaymentResponse);
          })
        );
      }),
      tap(() => this.loading$.next(false))
    );
  }
}
