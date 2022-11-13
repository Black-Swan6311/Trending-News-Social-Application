import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService, UserInfoDetail } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo?: UserInfoDetail
  constructor(private readonly googleApi: GoogleApiService,private  router : Router) { 
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })
  }
  
  public redirect() {
    this.router.navigate(['/dashboard', 'chat']);
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  ngOnInit(): void {
  }

}
