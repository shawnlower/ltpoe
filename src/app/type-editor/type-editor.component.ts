import { Component, OnInit } from '@angular/core';

import { LtpService } from '../services/ltp.service';

@Component({
  selector: 'app-type-editor',
  templateUrl: './type-editor.component.html',
  styleUrls: ['./type-editor.component.css']
})
export class TypeEditorComponent implements OnInit {

  model: any;

  submitted = false;

  onSubmit() {
      this.ltpService.newType(this.model);
      this.submitted = true;
  }

  constructor(private ltpService: LtpService) { }

  resetForm() {
      this.model = {
          name: 'blah',
          description: 'would be nice'
      };
  }
  ngOnInit() {
      this.resetForm();
  }
}
