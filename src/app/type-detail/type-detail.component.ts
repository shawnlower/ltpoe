import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { LtpService } from '../services/ltp.service';
import { Type } from '../models/type';
import { Property } from '../models/property';

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrls: ['./type-detail.component.css']
})
export class TypeDetailComponent implements OnInit {

  type$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ltpService: LtpService
  ) { }


  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.type$ = this.ltpService.getType(id);
    this.type$.subscribe(t =>
      console.log(t));

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
