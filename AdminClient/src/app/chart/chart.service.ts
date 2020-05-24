import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LogService} from './logger/log.service';
import {ApiPathService} from '../services/api-path.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private logService: LogService, private http: HttpClient, private endPoint: ApiPathService) { }

  getChartData(): Observable<any> {
    return this.http.get(this.endPoint.statsTopProductsEndPoint).pipe(tap(_ => this.log('fetched data')),
      catchError(this.handleError('getChartData', []))
    );
  }

  getTopProductsData() {
    console.log('HTTP Request called');
    return this.http.get(this.endPoint.statsTopProductsEndPoint).pipe(tap(_ => this.log('fetched data')),
      catchError(this.handleError('getTopProductsData', []))
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
