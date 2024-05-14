import { inject, Injectable } from '@angular/core';
import { PaymentApiService } from '../api/payment.api.service';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import {
  defaultFilter,
  defaultPaymentResponse,
  defaultVM,
  PaymentTransactionFilter,
  VM,
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
  processingFiltering$ = new BehaviorSubject<boolean>(false);

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
      scan(this.updatePages.bind(this), {
        ...defaultVM,
      } as VM),
      tap(() => this.loading$.next(false))
    );
  }

  private updatePages(accumulator: VM, value: VM): VM {
    accumulator.items = value.items;

    if (this.processingFiltering$.value)
      accumulator.infinityItems = [...value.items];
    else
      accumulator.infinityItems = [
        ...accumulator.infinityItems,
        ...value.items,
      ];

    accumulator.pagination.currentPage = value.pagination.currentPage;
    accumulator.pagination.hasNext = value.pagination.hasNext;
    accumulator.pagination.numberOfPages = value.pagination.numberOfPages;
    accumulator.pagination.totalNumberOfItems =
      value.pagination.totalNumberOfItems;

    if (this.processingFiltering$.value) this.processingFiltering$.next(false);

    return accumulator;
  }
}
