import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { defaultFilter } from '../models/model';
import { PaymentApiService } from '../api/payment.api.service';
import { mockPaymentResponse } from '../api/payment.mock';

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
            getPayments: jest.fn(() => of(mockPaymentResponse)),
          },
        },
      ],
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stream of payment transactions', () => {
    service.filter$.next(defaultFilter);
    const expected = mockPaymentResponse;
    expected.currentPage = 1;

    service.getPaymentTransactions().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.pagination.currentPage).toEqual(1);
      expect(response).toEqual(expected);
    });
  });
});
