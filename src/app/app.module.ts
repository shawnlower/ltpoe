import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypeEditorComponent } from './type-editor/type-editor.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';

import { MatAutocompleteModule } from '@angular/material';
import { MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { DialogNewItemComponent } from './dialog-new-item/dialog-new-item.component';

import { StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

import { reducers, metaReducers } from './reducers';
import { PropertyCompleterComponent } from './property-completer/property-completer.component';
import { ItemsListComponent } from './items-list/items-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TypesListComponent,
    TypeEditorComponent,
    TypeDetailComponent,
    ItemEditorComponent,
    DialogNewItemComponent,
    SnackBarComponent,
    PropertyCompleterComponent,
    ItemsListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, { metaReducers }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogNewItemComponent,
    SnackBarComponent,
  ]
})
export class AppModule { }
