import { Component, Input, OnInit } from '@angular/core';

import { Type } from '../models/type';

@Component({
  selector: 'app-props-list',
  templateUrl: './props-list.component.html',
  styleUrls: ['./props-list.component.css']
})
export class PropsListComponent implements OnInit {

  @Input() selectedType: Type;

  constructor() { }

  ngOnInit() {
  }

}
