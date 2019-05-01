import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private sanitizer: DomSanitizer,
    private ltpService: LtpService) { }

  deleteType(type) {
      console.log('Request to delete: ', type);
  }

  ngOnInit() {

    this.ltpService.getTypes().subscribe(res => {
      this.types = [];
      // Trust any HTML in the description.
      res.forEach(t => {
        t.description = this.sanitizer.bypassSecurityTrustHtml(t.description) as string;
        this.types.push(t);
      });
    });
  }
}
