import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypesListComponent } from './types-list/types-list.component';

const routes: Routes = [
  { path: 'types', component: TypesListComponent },
  { path: 'type/:id', component: TypeDetailComponent },
  { path: 'item/:id', component: ItemEditorComponent },
];


@NgModule({
  imports: [
  RouterModule.forRoot(
    routes, {
        enableTracing: false
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
