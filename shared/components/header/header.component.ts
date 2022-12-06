import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService } from 'src/app/services/google-api.service';
// import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private readonly googleApi: GoogleApiService, private router: Router) { }

  ngOnInit() { }

  clearLoginStatus(): void {
    window.localStorage.removeItem('loginStatus')
  }

  signOut() {
    // this.clearLoginStatus()
    this.googleApi.signOut()
  }

  userprofile() {
    alert('userprofile');
    this.router.navigateByUrl('/setting');
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
