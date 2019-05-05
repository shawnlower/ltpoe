import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { LtpService } from '../services/ltp.service';
import { Type } from '../models/type';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {

  logger: any;

  types: Array<Type>;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    private ltpService: LtpService) {
        // this.logger = store.select('logger');
        // this.logger.dispatch({message: "Test Message"});
    }
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
