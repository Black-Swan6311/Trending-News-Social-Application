import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfoDetail } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userInfo?: UserInfoDetail
  constructor(private readonly googleApi: GoogleApiService) { 
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })
  }
  
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  ngOnInit(): void {
  }

}
