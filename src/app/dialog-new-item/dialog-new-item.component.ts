import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Type } from '../models/type';

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'app-dialog-new-item',
  templateUrl: './dialog-new-item.component.html',
  styleUrls: ['./dialog-new-item.component.css']
})
export class DialogNewItemComponent implements OnInit {

  type$: Observable<Type>;

  constructor(
      public dialogRef: MatDialogRef<DialogNewItemComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        name: string, type$: Observable<Type>
      }
  ) {
    this.type$ = data.type$;
  }

  ngOnInit() {
    this.type$.subscribe(t =>
      console.log('got type', t));
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
