import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypeEditorComponent } from './type-editor/type-editor.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TypesListComponent,
    TypeEditorComponent,
    TypeDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
