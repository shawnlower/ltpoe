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
  private queryUrl = 'http://localhost:3030/test/query';

  private getTypesQuery = `query=
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX schema: <http://schema.org/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT ?iri ?name ?description WHERE {
        { ?iri rdf:type owl:Class . }
          UNION
        { ?iri rdf:type rdfs:Class . }
        ?iri rdfs:label ?name .
        ?iri rdfs:comment ?description
      } LIMIT 10
  `;

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
          })
      );
  }

  getTypes(): Observable<Type[]> {

    return this.http.post<any>(this.queryUrl, this.getTypesQuery, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            this.types = [];
            for (var i=0; i < response.results.bindings.length; i++) {
              this.types.push({
                iri: response.results.bindings[i].iri.value,
                name: response.results.bindings[i].name.value,
                description: response.results.bindings[i].description.value
              });
            }
            return this.types;
          }),
          catchError(this.handleError<Type[]>('getTypes', []))
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
      id: 'testBook',
      name: 'The Indispensable Calvin and Hobbes',
      description: 'The works of Bill Waterson',
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
