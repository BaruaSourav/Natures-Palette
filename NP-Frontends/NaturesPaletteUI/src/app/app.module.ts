import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './PageComponents/home/home.component';
import { NavMenuComponent} from './SharedComponents/nav-menu/nav-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponentComponent } from './PageComponents/upload-component/upload-component.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
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
    UploadComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
