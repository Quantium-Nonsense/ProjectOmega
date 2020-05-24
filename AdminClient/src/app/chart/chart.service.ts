import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LogService} from './logger/log.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private apiUrl = 'api/';  // URL to web api

  constructor(
    private logService: LogService, private http: HttpClient) { }

  getChartData(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl).pipe(tap(_ => this.log('fetched data')),
      catchError(this.handleError<number[]>('getChartData', []))
    );
  }

  getTopProductsData(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl).pipe(tap(_ => this.log('fetched data')),
    catchError(this.handleError<number[]>('getTopProductsData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console/service
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
      this.logService.add(`ChartService: ${message}`);
    }
}
