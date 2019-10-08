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
  selectedType: Type;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<any>,
    // this.logger = store.select('logger');
    // this.logger.dispatch({message: "Test Message"});
    private sanitizer: DomSanitizer,
    private ltpService: LtpService) { }

  deleteType(type) {
      console.log('Request to delete: ', type);
  }

  ngOnInit() {
    this.ltpService.getTypes().subscribe(res => {
      this.types = [];
      res.forEach(t => {
        // Trust any HTML in the description.
        t.description = this.sanitizer.bypassSecurityTrustHtml(t.description) as string;
        this.types.push(t);
      });

      // Select the first entry automatically
      if (this.types.length > 0) {
        this.selectType(this.types[0]);
      }
    });
  }

  selectType(t) {
    // Types list does not include properties. Fetch them for the single selected type
    this.ltpService.getProperties(t.type_id).subscribe(properties => {
      t.properties = properties;
      this.selectedType = t;
      console.log("Selecting type: ", t);
    });
  }

}
