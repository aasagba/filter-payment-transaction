export type VM = PaginatedAPIResponse<PaymentTransactionDto>;

export type Status =
  | 'CAPTURED'
  | 'COMPLETED'
  | 'CREATED'
  | 'FAILED'
  | 'SETTLED';

// PaymentTransactionRequest
export interface PaymentTransactionFilter {
  createdAtStart?: string;
  createdAtEnd?: string;
  page: number;
  size: number;
  status?: Status;
}

export interface PaginatedAPIResponse<T> {
  currentPage: number;
  hasNext: boolean;
  items: T[];
  infinityItems?: T[];
  numberOfPages: number;
  pageSize: number;
  totalNumberOfItems: number;
  reset?: boolean;
}

export interface PaymentTransactionDto {
  id: string;
  amount: number;
  createdAt: string;
  currency: string;
  description: string;
  status: Status;
}

export const defaultPaymentResponse: PaginatedAPIResponse<PaymentTransactionDto> =
  {
    items: [],
    currentPage: 0,
    hasNext: false,
    numberOfPages: 0,
    pageSize: 0,
    totalNumberOfItems: 0,
  };

export const defaultFilter: PaymentTransactionFilter = {
  page: 0,
  size: 5,
};

export const PAGINATION_DEFAULT_SIZE = 5;
