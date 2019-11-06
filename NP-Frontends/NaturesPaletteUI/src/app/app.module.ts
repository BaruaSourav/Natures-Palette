import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './PageComponents/home/home.component';
import { NavMenuComponent} from './SharedComponents/nav-menu/nav-menu.component';
import { UploadComponent } from './PageComponents/upload/upload.component';
import { FooterComponent } from './SharedComponents/footer/footer.component';

import { RouterModule, Routes } from '@angular/router';

// Services
import {SubmissionService} from './Service/submission.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  // { path: 'hero/:id', component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

// TODO: Vivek [You need to add any modules that I ask you to do into this is the base module for the entire application]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UploadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    SubmissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
