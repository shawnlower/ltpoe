import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LtpService } from '../services/ltp.service';
import { Type } from '../models/type';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {

  types: Array<Type>;

  constructor(
    private route: ActivatedRoute,
    private ltpService: LtpService) { }

  deleteType(type) {
      console.log('Request to delete: ', type);
  }

  ngOnInit() {
      // this.route.paramMap.pipe(params =>
      //   console.log('got params', params));

      this.ltpService.getTypes().subscribe(res => {
          this.types = res;
      });
  }
}
