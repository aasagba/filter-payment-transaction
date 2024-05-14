import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  PaginatedAPIResponse,
  PaymentTransactionDto,
  PaymentTransactionFilter,
} from '../models/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  #httpClient: HttpClient = inject(HttpClient);

  #url = 'http://localhost:8080/api/v1';
  #userName = 'user';
  #password = 'userPass';
  #authData = btoa(`${this.#userName}:${this.#password}`);
  #headers = new HttpHeaders({
    Authorization: `Basic ${this.#authData}`,
    'Content-Type': `application/json`,
  });

  public getPayments(
    request?: PaymentTransactionFilter
  ): Observable<PaginatedAPIResponse<PaymentTransactionDto>> {
    const params = this.buildQueryParams(request);
    return this.#httpClient
      .get<PaginatedAPIResponse<PaymentTransactionDto>>(
        `${this.#url}/payments`,
        {
          headers: this.#headers,
          params,
        }
      )
      .pipe(
        map(res => ({
          ...res,
          currentPage: res.currentPage + 1,
        }))
      );
  }

  private buildQueryParams(source: PaymentTransactionFilter): HttpParams {
    let params: HttpParams = new HttpParams();
    for (const key in source) {
      params = params.append(key, source[key]);
    }

    return params;
  }
}
