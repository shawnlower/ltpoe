import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypesListComponent } from './types-list/types-list.component';

const routes: Routes = [
  { path: 'types', component: TypesListComponent },
  { path: 'type/:id', component: TypeDetailComponent },
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
