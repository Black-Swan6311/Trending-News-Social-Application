import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsapiService } from './services/newsapi.service';
import { TechnologyComponent } from './components/technology/technology.component';
import { BusinessComponent } from './components/business/business.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { SportComponent } from './components/sport/sport.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HealthComponent } from './components/health/health.component';
import { GeneralComponent } from './components/general/general.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { ScienceComponent } from './components/science/science.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TechnologyComponent,
    BusinessComponent,
    LoginComponent,
    SearchComponent,
    UserLocationComponent,
    SportComponent,
    HealthComponent,
    GeneralComponent,
    EntertainmentComponent,
    ScienceComponent,
    UserDashboardComponent,
    LogoutComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    MaterialModule
   
    
  ],
  providers: [NewsapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
