import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Type } from '../models/type';
 
const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LtpService {
  types: Array<Object> = [
      { 'name': 'Book', 'description':  'A book, either electronic or printed' },
      { 'name': 'Person', 'description':  'A person (alive, dead, undead, or fictional).' },
      { 'name': 'Event', 'description':  'An event happening at a certain time and location, such as a concert, lecture, or festival.' }
  ];

  private queryUrl = 'http://localhost:3030/test/query';

  private testQuery = `query=
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX schema: <http://schema.org/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT ?name ?description WHERE {
        { ?s rdf:type owl:Class . }
          UNION
        { ?s rdf:type rdfs:Class . }
        ?s rdfs:label ?name .
        ?s rdfs:comment ?description
      }
  `;

  constructor(private http: HttpClient) { }

  get() {
    // return of(this.types);
    return this.getTypes();
  }

  getTypes(): Observable<Type[]> {

    return this.http.post<any>(this.queryUrl, this.testQuery, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            let types: Type[] = [];
            for (var i=0; i < response.results.bindings.length; i++) {
              types.push({
                'name': response.results.bindings[i].name.value,
                'description': response.results.bindings[i].description.value
              });
            }
            return types;
          }),
          catchError(this.handleError<Type[]>('getTypes', []))
      );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  put(type) {
      console.log("Want to add: ", type);
      this.types.push(type);
  }
}
