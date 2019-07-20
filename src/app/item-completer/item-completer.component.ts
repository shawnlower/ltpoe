import { FormControl } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, last, take, startWith, map, switchMap } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Property } from '../models/property';
import { Type } from '../models/type';
import { LtpService } from '../services/ltp.service';

@Component({
  selector: 'app-item-completer',
  templateUrl: './item-completer.component.html',
  styleUrls: ['./item-completer.component.css']
})
export class ItemCompleterComponent implements OnInit {

  @Input() typeId: string;

  allItems$: Observable<Item[]>;
  itemResults$: Observable<Item[]>;

  filteredItems$: Observable<Item[]>;

  itemValueCtrl = new FormControl();

  constructor(private ltpService: LtpService) { }

  ngOnInit() {
    console.log('called');
    this.allItems$ = this.ltpService.getItems(this.typeId);
    this.filteredItems$ = this.allItems$.pipe(take(5));

    this.itemValueCtrl.valueChanges.pipe(
        switchMap(query => this.filterItems(query)))
      .subscribe(items => {
          console.log('item results', items);
          this.filteredItems$ = of(items);
          });
  }

  private addProperty(item: Item) {
    console.log("And here's where we actually use ngrx, or call the service, or..");
  }

  private filterItems(query): Observable<Item[]> {
    const filterValue = query.toLowerCase();
    console.log('filter', query, filterValue);
    return this.allItems$.pipe(
        map(items => {
          let filtered = items.filter(i => i.name.toLowerCase().indexOf(filterValue) >= 0);
          console.log('items filterMap', items, filtered, filterValue);
          return filtered;
          })
        );
  }

}
