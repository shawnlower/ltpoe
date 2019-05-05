import { Component, OnInit } from '@angular/core';
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

  deleteType(type) {
      console.log('Request to delete: ', type);
  }

  ngOnInit() {
      // this.route.paramMap.pipe(params =>
      //   console.log('got params', params));

      this.ltpService.getTypes().subscribe(res => {
          this.types = res;
      }, err => {
          this.snackBar.open(err.message, "Dismiss", {
            duration: 5000,
          });
      });
  }
}
