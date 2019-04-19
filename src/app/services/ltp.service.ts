import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LtpService {
    types: Array<Object> = [
        { 'name': 'Book', 'description':  'A book, either electronic or printed' },
        { 'name': 'Person', 'description':  'A person (alive, dead, undead, or fictional).' },
        { 'name': 'Event', 'description':  'An event happening at a certain time and location, such as a concert, lecture, or festival.' }
    ];


  constructor() { }

  get() {
      return of(this.types);
  }

  put(type) {
      console.log("Want to add: ", type);
      this.types.push(type);
  }
}
