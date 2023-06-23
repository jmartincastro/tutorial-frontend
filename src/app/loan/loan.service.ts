import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from './model/Loan';
import { Observable, of } from 'rxjs';
import { LOAN_DATA } from './model/mock-loans';
import { Pageable } from '../core/model/page/Pageable';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA_LIST } from './model/mock-loans-list';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getLoans(
    pageable: Pageable,
    gameId?: number,
    clientId?: number,
    date?: string    
  ): Observable<LoanPage> {
      //return of(LOAN_DATA);
      return this.http.post<LoanPage>(this.composeFindUrl(gameId, clientId, date),{ pageable: pageable });
  }

  saveLoan(loan: Loan): Observable<any> {
    let url = 'http://localhost:8080/loan';

    if (loan.id != null) {
      url += '/' + loan.id;
    }

    return this.http.put<any>(url, loan);
  }

  private composeFindUrl(
    gameId?: number,
    clientId?: number,
    date?: string
  ): string {
    let params = '';

    if (gameId != null) {
      params += 'idGame=' + gameId;
    }

    if (clientId != null) {
      if (params != '') params += '&';
      params += 'idClient=' + clientId;
    }

    if (date != null) {
      if (params != '') params += '&';
      params += 'date=' + date;
    }

    let url = 'http://localhost:8080/loan';

    if (params == '') return url;
    else return url + '?' + params;
  }

  deleteLoan(idLoan: number): Observable<any> {
    return this.http.delete('http://localhost:8080/loan/' + idLoan);
  }

}
