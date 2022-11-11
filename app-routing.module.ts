import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './components/business/business.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { GeneralComponent } from './components/general/general.component';
import { HealthComponent } from './components/health/health.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ScienceComponent } from './components/science/science.component';
import { SearchComponent } from './components/search/search.component';
import { SportComponent } from './components/sport/sport.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component:MainPageComponent , pathMatch: 'full'},
  { path: 'home', component: MainPageComponent }, // Home Page
  { path: 'Sport', component:SportComponent}, //Sport Page
  { path: 'health', component:HealthComponent}, // Health Page
  { path: 'general', component:GeneralComponent}, // General Page
  { path: 'entertainment', component:EntertainmentComponent}, // Entertainment Page
  { path: 'science', component:ScienceComponent},  // Science Page
  { path: 'search', component: SearchComponent }, // Top Headline & Home page
  { path: 'business' , component: BusinessComponent}, // Business Page
  { path: 'login' , component : LoginComponent}, // Login Page
  { path: 'technology', component: TechnologyComponent }, // Technology Page
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'logout' , component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
