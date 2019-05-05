import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Observable, of, forkJoin } from 'rxjs';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { DialogNewItemComponent } from '../dialog-new-item/dialog-new-item.component';
import { LtpService } from '../services/ltp.service';
import { Type } from '../models/type';
import { Property } from '../models/property';

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.css'],
})
export class TypeDetailComponent implements OnInit {

  type$: Observable<any>;
  name: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private ltpService: LtpService
  ) { }


  instantiate(): void {
    /*
    this.type$.subscribe(o =>
      this.router.navigate(['/items/new', o.name]));
      */
    // const dialogRef = this.dialog.open(DialogTest, {
    const dialogRef = this.dialog.open(DialogNewItemComponent, {
      width: '250px',
      data: {type$: this.type$, name: this.name}
    });

    forkJoin( dialogRef.afterClosed(), this.type$
    ).subscribe( ([response, type])  => {
        this.ltpService.newItem(response.name, type.iri).subscribe(item =>
          this.router.navigate(['/item/', item.id]));
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.type$ = this.ltpService.getType(id);
    this.type$.subscribe(t =>
      console.log('type-detail init:', t));

    /*
    this.type$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = 'Book'; // params.get('id');

        console.log('loading type definition for: ', id);

        return this.ltpService.getType(id);
      })
    );
    */

  }

}

