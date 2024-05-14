import { TestBed } from '@angular/core/testing';

import { PaymentApiService } from './payment.api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject } from '@angular/core/testing';
import { PaginatedAPIResponse, PaymentTransactionDto } from '../models/model';
import { mockPaymentResponse } from './payment.mock';

describe('PaymentApiService', () => {
  let service: PaymentApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentApiService],
    });
    service = TestBed.inject(PaymentApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(inject(
    [HttpTestingController],
    (backend: HttpTestingController) => {
      backend.verify();
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPayments()', () => {
    it('should construct url and call getStarWarsPeople', () => {
      const response: PaginatedAPIResponse<PaymentTransactionDto> =
        mockPaymentResponse;
      const expected: PaginatedAPIResponse<PaymentTransactionDto> = {
        ...response,
        currentPage: response.currentPage + 1,
      };

      let actual: PaginatedAPIResponse<PaymentTransactionDto> = null;

      service.getPayments().subscribe(response => (actual = response));

      const req = httpMock.expectOne('http://localhost:8080/api/v1/payments');
      req.flush(response);

      expect(req.request.method).toBe('GET');
      expect(actual).toEqual(expected);
    });
  });
});
