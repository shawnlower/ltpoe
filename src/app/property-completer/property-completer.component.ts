import { FormControl } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, take, last, startWith, map, switchMap } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Property } from '../models/property';
import { LtpService } from '../services/ltp.service';

import { ItemCompleterComponent } from '../item-completer/item-completer.component';

@Component({
  selector: 'app-property-completer',
  templateUrl: './property-completer.component.html',
  styleUrls: ['./property-completer.component.css']
})
export class PropertyCompleterComponent implements OnInit {

  @Input() item: Observable<Item>;

  @ViewChild('propVal')
  propVal: ElementRef;

  propertyCtrl = new FormControl();
  propertyValueCtrl = new FormControl();

  properties$: Observable<Property[]>;
  filteredProperties: Observable<Property[]>;

  property$: Observable<Property>;

  constructor(
    private ltpService: LtpService,
  ) { }

  ngOnInit() {
    if (this.item) {
      this.item.subscribe(item => {
        this.properties$ = this.ltpService.getProperties(item.item_type);
      });
    }

    this.propertyCtrl.valueChanges.pipe(
      switchMap(query => this.filterProperties(query)))
            .subscribe(properties => {
              console.log('results', properties);
              this.filteredProperties = of(properties);
            });
  }

  private filterProperties(query): Observable<Property[]> {
    const filterValue = query.toLowerCase();
    console.log('filter', query, filterValue);
    return this.properties$.pipe(
      map(props => {
        console.log('filterMap', props.filter(p => p.name.indexOf(filterValue)));
        return props.filter(p => p.name.indexOf(filterValue) === 0 ||
                                 p.description.indexOf(filterValue) >= 0);
      })
    );
  }

  onEnter(evt: any) {

    if (evt !== undefined && evt.source.selected) {
      const name = evt.source.value;
      console.log('onEnter', name);
      this.property$ = this.properties$.pipe(
        last(),
        map(properties => properties.filter(p => p.name === name).shift())
      );
      this.property$.subscribe(property => {
        /* this.propertyCtrl.disable();
        if (this.propVal.nativeElement) {
          this.propVal.nativeElement.focus();
        }
        */
      });
    }

  }
}
