import { FormControl } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, last, startWith, map, switchMap } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Type } from '../models/type';
import { LtpService } from '../services/ltp.service';

@Component({
  selector: 'app-item-completer',
  templateUrl: './item-completer.component.html',
  styleUrls: ['./item-completer.component.css']
})
export class ItemCompleterComponent implements OnInit {

  @Input() itemQuery: string;
  @Input() typeId: string;

  allItems$: Observable<Item[]>;
  itemResults$: Observable<Item[]>;

  constructor(private ltpService: LtpService) { }

  ngOnInit() {
    this.allItems$ = this.ltpService.getItems(this.typeId);
  }

}
