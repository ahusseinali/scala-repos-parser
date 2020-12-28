import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposListComponent } from './list/repos.list.component';

const routes: Routes = [
  { path: '', redirectTo: 'repos', pathMatch: 'full' },    
  { path: 'repos', component: ReposListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
