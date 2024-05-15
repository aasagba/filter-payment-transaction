import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { PaymentApiService } from '../api/payment.api.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  mockPaymentItems,
  mockPaymentItemsPage1,
  mockPaymentPage1Response,
  mockPaymentResponse,
} from '../api/payment.mock';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PaymentService,
        {
          provide: PaymentApiService,
          useValue: {
            getPayments: jest
              .fn()
              .mockReturnValueOnce(of(mockPaymentResponse))
              .mockReturnValueOnce(of(mockPaymentPage1Response)),
          },
        },
      ],
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPaymentTransactions', () => {
    it('should set items after filter event', done => {
      service.filter$.next({ page: 0, size: 2 });

      service.getPaymentTransactions().subscribe(response => {
        expect(response.items).toEqual(mockPaymentItems);

        done();
      });
    });

    it('should accumulate infinity items after two filter events', done => {
      // Trigger the first filter event
      service.filter$.next({ page: 0, size: 2 });

      // Trigger the filter changes and capture responses
      service.getPaymentTransactions().subscribe(response => {
        if (response.pagination.currentPage === 0) {
          expect(response.infinityItems).toEqual(mockPaymentItems);

          // Trigger the second filter event
          service.filter$.next({ page: 1, size: 2 });
        } else if (response.pagination.currentPage === 1) {
          expect(response.infinityItems).toEqual([
            ...mockPaymentItems,
            ...mockPaymentItemsPage1,
          ]);

          done();
        }
      });
    });
  });
});
