import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypeEditorComponent } from './type-editor/type-editor.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';

import {MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { DialogNewItemComponent } from './dialog-new-item/dialog-new-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    TypesListComponent,
    TypeEditorComponent,
    TypeDetailComponent,
    ItemEditorComponent,
    DialogNewItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogNewItemComponent
  ]
})
export class AppModule { }
