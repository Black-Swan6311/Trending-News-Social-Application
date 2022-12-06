import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GoogleApiService } from 'src/app/services/google-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone,
    private readonly googleApi: GoogleApiService) {
    if (!googleApi.isLoggedIn()) {
      googleApi.tryLoginImplicitFlow().then(() => {
        window.localStorage.setItem('shouldRefresh', JSON.stringify(true)) 
        googleApi.initImplicitFlow()
      })
    } else {
      this._ngZone.run(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }


  ngOnInit(): void {
  }

}
