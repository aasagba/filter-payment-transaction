import { inject, Injectable } from '@angular/core';
import { PaymentApiService } from '../api/payment.api.service';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultFilter,
  defaultPaymentResponse,
  PaymentTransactionFilter,
} from '../models/model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiService = inject(PaymentApiService);
  private breakpointObserver = inject(BreakpointObserver);

  filter$ = new BehaviorSubject<PaymentTransactionFilter | null>(defaultFilter);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  readonly isMobileBreakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(
      distinctUntilChanged(),
      map(breakpoint => breakpoint.matches)
    );

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
      map(res => ({
        items: res.items,
        pagination: {
          ...res,
          currentPage: res.currentPage,
        },
      })),
      tap(() => this.loading$.next(false))
    );
  }
}
