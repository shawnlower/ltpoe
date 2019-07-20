import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item } from '../models/item';
import { LtpService } from '../services/ltp.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {

  item$: Observable<Item>;

  constructor(private ltpService: LtpService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    this.item$ = this.ltpService.getItem(id);
    this.item$.subscribe(item => {
      console.log('got item', item);
      console.log('route', this.route.snapshot);
    });
  }

}
