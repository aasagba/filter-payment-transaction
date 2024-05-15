import { PaginatedAPIResponse, PaymentTransactionDto } from '../models/model';

export const mockPaymentItems: PaymentTransactionDto[] = [
  {
    id: 'abc',
    amount: 12,
    createdAt: '2021-07-24T12:27:07.965',
    currency: 'USD',
    description: 'mock payment 1',
    status: 'CREATED',
  },
  {
    id: 'def',
    amount: 33,
    createdAt: '2021-07-25T13:27:07.965',
    currency: 'GBP',
    description: 'mock payment 2',
    status: 'SETTLED',
  },
];

export const mockPaymentItemsPage1: PaymentTransactionDto[] = [
  {
    id: 'ghi',
    amount: 99,
    createdAt: '2021-08-29T12:27:07.965',
    currency: 'USD',
    description: 'mock payment 3',
    status: 'COMPLETED',
  },
  {
    id: 'jkl',
    amount: 50,
    createdAt: '2021-09-01T13:27:07.965',
    currency: 'GBP',
    description: 'mock payment 4',
    status: 'COMPLETED',
  },
];

export const mockPaymentResponse: PaginatedAPIResponse<PaymentTransactionDto> =
  {
    items: mockPaymentItems,
    currentPage: 0,
    hasNext: true,
    numberOfPages: 2,
    pageSize: 2,
    totalNumberOfItems: 4,
  };

export const mockPaymentPage1Response: PaginatedAPIResponse<PaymentTransactionDto> =
  {
    items: mockPaymentItemsPage1,
    currentPage: 1,
    hasNext: true,
    numberOfPages: 2,
    pageSize: 2,
    totalNumberOfItems: 4,
  };
