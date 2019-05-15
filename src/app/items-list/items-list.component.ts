import { Component, OnInit, Input } from '@angular/core';

import { LtpService } from '../services/ltp.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() itemTypeId: string;
  items: Item[];

  constructor(private ltpService: LtpService) { }

  ngOnInit() {
    console.log('Looking up: ', this.itemTypeId);
    this.ltpService.getItems(this.itemTypeId).subscribe(res => {
      this.items = res;
    });
  }

}
