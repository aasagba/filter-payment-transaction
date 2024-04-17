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

export const mockPaymentResponse: PaginatedAPIResponse<PaymentTransactionDto> =
  {
    items: [],
    currentPage: 0,
    hasNext: true,
    numberOfPages: 1,
    pageSize: 5,
    totalNumberOfItems: 2,
  };
