import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Item } from '../models/item';
import { Type } from '../models/type';
import { Mapping } from '../models/mapping';
import { Property } from '../models/property';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LtpService {

  types: Array<Type>;

  queryUrl = '/api/v1';

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

    return this.http.get<any>(`${this.queryUrl}/types/${id}?all_properties=true`, httpOptions)
      .pipe(
          tap(response => console.log('response ', response)),
          map(response => {
            const t: Type = response.metadata;
            t.properties = response.properties;
            return t;
          }),
          catchError(this.handleError<Type>('getType', null)),
      );
  }

  getMappings(resource: string): Observable<Mapping[]> {

    return this.http.get<any>(this.queryUrl + '/mappings/' + resource, httpOptions)
      .pipe(
          tap(response => console.log('getMappings()', response)),
          map(response => response.mappings),
          catchError(this.handleError<Mapping[]>('getMappings', [])),
      );
  }

  getTypes(): Observable<Type[]> {

    return this.http.get<any>(this.queryUrl + '/types/', httpOptions)
      .pipe(
          tap(response => console.log('getTypes()', response)),
          map(response => response.data),
          catchError(this.handleError<Type[]>('getTypes', [])),
      );
  }


  getProperties(id: string, allProperties = true): Observable<Property[]> {

    let idNormalized: string;
    if ( id.startsWith('http:') ) {
      idNormalized = id.slice(id.lastIndexOf('/') + 1);
    } else {
      idNormalized = id;
    }
    const url = `${this.queryUrl}/types/${idNormalized}`;

    return this.http.get<any>(url, httpOptions)
      .pipe(
          tap(response => console.log('getProperties response ', response)),
          map(response => {
            const properties: Property[] = [];
            for (const property of response.properties) {
              properties.push({
                property_id: property.property_id as string,
                name: property.name as string,
                description: property.description as string,
                property_range: property.property_range as Array<string>,
                property_domain: property.property_domain as Array<string>,
              });
            }
            return properties;
          }),
          catchError(this.handleError<Property[]>('getProperties', []))
      );
  }


  newType(newType: Type) {

    console.log('newType type: ', newType);

    const data = new HttpParams();
    console.log('headers', httpOptions);

    return this.http.post('/api/v1/types', newType, httpOptions)
      .subscribe(response => {
            console.log('Adding: ', newType);
            console.log('Response: ', response);
      });
  }

  newItem(name: string, itemType: string): Observable<Item> {

    console.log('newItem item: ', name, itemType);

    return this.http.post<{ item: Item }>('/api/v1/items', { name, itemType})
      .pipe(
        tap(response => console.log('Response: ', response)),
        map(response => response.item)
      );
  }

  getItem(id: string): Observable<Item> {

    return this.http.get<any>('/api/v1/items/' + id, httpOptions)
      .pipe(
          tap(response => console.log(`response for ${id}:`, response)),
          map(response => {
            let t = <Item>response;
            return t;
          })
      );
  }

  getItems(itemTypeId?: string): Observable<Item[]> {

    if (!itemTypeId) itemTypeId="";

    return this.http.get<any>('/api/v1/items/?item_type_id=' + itemTypeId,
        httpOptions)
      .pipe(
          tap(response => console.log('getItems response for', itemTypeId, response)),
          map(response => response.data as Item[])
      );
  }

}
