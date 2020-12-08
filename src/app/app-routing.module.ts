import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';
import { ResultSingleComponent } from './result-single/result-single.component';
import { WatchListComponent } from './watch-list/watch-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WatchListComponent
  },
  {//Not using landing page as home directory anymore
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'result/:searchTerm',
    component: ResultComponent
  },
  {
    path: 'result-single/:id',
    component: ResultSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
