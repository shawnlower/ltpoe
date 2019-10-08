import { Component, Input, OnInit } from '@angular/core';

import { LtpService } from '../services/ltp.service';
import { Mapping } from '../models/mapping';
import { Type } from '../models/type';

@Component({
  selector: 'app-mappings-list',
  templateUrl: './mappings-list.component.html',
  styleUrls: ['./mappings-list.component.css']
})
export class MappingsListComponent implements OnInit {

  mappings: Mapping[] = [];
  @Input() itemType: Type;
  add_mapping_visible = false;

  constructor(
    private ltpService: LtpService,
  ) {
  }

  ngOnInit() {
    this.ltpService.getMappings(this.itemType.type_id).subscribe(mappings => {
      console.log('Got mappings', mappings);
      this.mappings = mappings;
    });
  }

}
