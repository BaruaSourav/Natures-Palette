import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './PageComponents/home/home.component';
import { NavMenuComponent} from './SharedComponents/nav-menu/nav-menu.component';
import { UploadComponent } from './PageComponents/upload/upload.component';
import { FooterComponent } from './SharedComponents/footer/footer.component';
import { SearchComponent } from './PageComponents/search/search.component';
import { ModificationComponent } from './PageComponents/modification/modification.component';

import { RouterModule, Routes } from '@angular/router';

// Services
import {SubmissionService} from './Service/submission.service';




const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'search', component: SearchComponent},
  { path: 'modification', component: ModificationComponent},
];

// TODO: Vivek [You need to add any modules that I ask you to do into this is the base module for the entire application]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UploadComponent,
    FooterComponent,
    SearchComponent,
    ModificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
