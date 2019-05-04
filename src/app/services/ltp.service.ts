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
  })
};

@Injectable({
  providedIn: 'root'
})
export class LtpService {

  types: Array<Type>;
  private queryUrl = 'http://localhost:5000/v1';

  private getNewTypeQuery(iri) {
    return `query=
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX schema: <http://schema.org/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      INSERT {
        <${iri}> rdf:type rdfs:Class .
        <${iri}> rdfs:label "Foo" .
        <${iri}> rdfs:comment "Some fooish description"
      } WHERE {}
    `;
  }

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

    return this.http.get<any>(`${this.queryUrl}/types/${id}`, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            const t = response.metadata as Type;
            t.properties = response.properties as Property[];
            return t;
          })
      );
  }

  getTypes(): Observable<Type[]> {

    return this.http.get<any>(`${this.queryUrl}/types/`, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            this.types = [];
            for (const type of response.data) {
              this.types.push({
                iri: type.iri,
                name: type.name,
                description: type.description,
              });
            }
            return this.types;
          }),
          catchError(this.handleError<Type[]>('getTypes', []))
      );
  }


  getProperties(typeIri: string): Observable<Property[]> {

    const url = `${this.queryUrl}/properties/?typeIri=${typeIri}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
          tap(response => console.log('getProperties response ', response)),
          map(response => {
            const properties: Property[] = [];
            for (const property of response.data) {
              properties.push({
                iri: property.iri as string,
                name: property.name as string,
                description: property.description as string,
                datatype: property.datatype as string,
              });
            }
            return properties;
          }),
          catchError(this.handleError<Property[]>('getProperties', []))
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
      itemType: 'http://schema.org/Book',
      name: 'Mock Data',
      description: 'The works of H.G. Wells',
      properties: []
    });
  }

  getItem(id: string): Observable<Item> {

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
