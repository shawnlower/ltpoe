import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'types', component: TypesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
