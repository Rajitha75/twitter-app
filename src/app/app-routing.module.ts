import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwitterComponent } from './twitter/twitter.component';

const routes: Routes = [
  
  { 
    path: 'twitter/gettweets', 
    component: TwitterComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
