import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { DialogNewItemComponent } from '../dialog-new-item/dialog-new-item.component';
import { LtpService } from '../services/ltp.service';
import { Type } from '../models/type';
import { Property } from '../models/property';

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.css']
})
export class TypeDetailComponent implements OnInit {

  @Input() selectedType: Type;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ltpService: LtpService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('TypeDetail: ', this.selectedType);
  }

  private instantiate() {
    console.log("Creating new item of type: ", this.selectedType.name);
    const dialogRef = this.dialog.open(DialogNewItemComponent, {
      data: {
        name: "",
        type: this.selectedType,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('From dialog: ', result);
    });

  }
}
