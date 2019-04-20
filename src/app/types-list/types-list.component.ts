import { Component, OnInit } from '@angular/core';

import { LtpService } from '../services/ltp.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {

  types: Array<Object>;

  constructor(private ltpService: LtpService) { }

  deleteType(type) {
      console.log("Request to delete: ", type);
  }

  ngOnInit() {
      this.ltpService.get().subscribe(res => {
          this.types = res;
      });
  }
}
