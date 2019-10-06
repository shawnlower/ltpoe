import { Component, OnInit, Input } from '@angular/core';
import { LtpService } from '../services/ltp.service';
import { Item } from '../models/item';
import { Type } from '../models/type';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() itemType: Type;
  items: Item[];

  constructor(private ltpService: LtpService) { }

  ngOnInit() {
    if (this.itemType ) {
      this.ltpService.getItems(this.itemType.type_id).subscribe(res => {
          console.log("Got item", res);
          this.items = res;
      });
    }
  }
}
