import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Item } from '../models/item';
import { Type } from '../models/type';
import { Property } from '../models/property';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LtpService {

  types: Array<Type>;

  constructor(private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  get() {
    return of(this.types);
  }

  getType(id: string): Observable<Type> {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http.get<any>('http://localhost:5000/v1/types/' + id, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            const t = <Type>response.metadata;
            t.properties = <Property[]>response.properties;
            return t;
          }),
          catchError(this.handleError<Type[]>('getType', [])),
      );
  }

  getTypes(): Observable<Type[]> {

    return this.http.get<any>('http://localhost:5000/v1/types/', httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => response.data),
          catchError(this.handleError<Type[]>('getTypes', [])),
      );
  }


  newType(type) {

    const prefix = 'http://ltp.shawnlower.net/i/';
    const iri = `${prefix}${uuid()}`;

    const query = this.getNewTypeQuery(iri);

    console.log('newType type: ', type);
    console.log('newType query: ', query);

    let httpOptions = {
      headers: new HttpHeaders({
             Accept: '*/*',
             'Content-Type': 'application/x-www-form-urlencoded',
             Authorization: 'Basic ' + btoa('admin:8XHWTTGfcZqWfbo')
             })
    };

    const data = new HttpParams();
    console.log('headers', httpOptions);

    return this.http.post('http://localhost:3031/test/update', query, httpOptions)
      .subscribe(response => {
            console.log('Adding: ', type);
            console.log('Response: ', response);
            this.types.push(<Type>type);
      });
  }

  newItem(name): Observable<Item> {
    return of({
      id: 'war-of-the-worlds',
      name: 'Mock Data',
      description: 'The works of H.G. Wells',
      properties: []
    });
  }

  getItem(id: string): Observable<Item> {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http.get<any>('http://localhost:5000/v1/items/' + id, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            const t: Item = response.metadata;
            t.properties = response.properties;
            return t;
          })
      );
  }

}
